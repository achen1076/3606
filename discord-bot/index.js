import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  EmbedBuilder,
} from "discord.js";
import { config } from "dotenv";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import XLSX from "xlsx";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// File paths
// Use /app/data for persistent storage on Render, fallback to local for dev
const DATA_DIR = process.env.RENDER ? "/app/data" : __dirname;
const USER_LINKS_FILE = join(DATA_DIR, "user-links.json");
const KOAB_DATA_FILE = join(__dirname, "KOAB3606.xlsx");
const UPDATED_DATA_FILE = join(__dirname, "updated_stats.xlsx");

// Ensure data directory exists
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize user links storage
let userLinks = {};
if (existsSync(USER_LINKS_FILE)) {
  userLinks = JSON.parse(readFileSync(USER_LINKS_FILE, "utf-8"));
}

// Save user links
function saveUserLinks() {
  writeFileSync(USER_LINKS_FILE, JSON.stringify(userLinks, null, 2));
}

// Load Excel data
function loadExcelData() {
  try {
    // Load baseline KOAB data
    const workbook1 = XLSX.readFile(KOAB_DATA_FILE);
    const worksheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
    const baselineData = XLSX.utils.sheet_to_json(worksheet1, { header: 1 });

    // Load updated data
    const workbook2 = XLSX.readFile(UPDATED_DATA_FILE);
    const worksheet2 = workbook2.Sheets["3606"];
    const updatedData = XLSX.utils.sheet_to_json(worksheet2, { header: 1 });

    return { baselineData, updatedData };
  } catch (error) {
    console.error("Error loading Excel data:", error);
    return null;
  }
}

// Calculate deltas and get player stats
function getPlayerStats(governorId) {
  const data = loadExcelData();
  if (!data) return null;

  const { baselineData, updatedData } = data;

  if (baselineData.length === 0) return null;

  const headers = baselineData[0];
  const idIndex = headers.findIndex((h) =>
    String(h).toLowerCase().includes("id")
  );

  // Find player in baseline data
  const playerRow = baselineData
    .slice(1)
    .find((row) => String(row[idIndex]) === String(governorId));
  if (!playerRow) return null;

  // Create player stats object
  const stats = {};
  headers.forEach((header, idx) => {
    stats[header] = playerRow[idx];
  });

  // Calculate deltas if updated data exists
  const updatedHeaders = updatedData[0];
  const updatedIdIndex = updatedHeaders.findIndex((h) =>
    String(h).toLowerCase().includes("id")
  );

  const updatedRow = updatedData
    .slice(1)
    .find((row) => String(row[updatedIdIndex]) === String(governorId));

  if (updatedRow) {
    stats.deltas = {};
    headers.forEach((header, idx) => {
      const baseVal = Number(playerRow[idx]);
      const updatedVal = Number(
        updatedRow[
          updatedHeaders.findIndex(
            (h) => String(h).toLowerCase() === String(header).toLowerCase()
          )
        ]
      );

      if (!isNaN(baseVal) && !isNaN(updatedVal) && baseVal !== updatedVal) {
        stats.deltas[header] = updatedVal - baseVal;
        stats[header + " (Updated)"] = updatedVal;
      }
    });
  }

  return stats;
}

// Format number with commas
function formatNumber(num) {
  if (isNaN(num)) return num;
  return Math.round(num).toLocaleString();
}

// Create progress bar with gradient colors
function createProgressBar(percentage) {
  const totalBars = 10;
  const filledBars = Math.min(
    Math.round((percentage / 100) * totalBars),
    totalBars
  );
  const emptyBars = totalBars - filledBars;

  const filled = "█".repeat(filledBars);
  const empty = "░".repeat(emptyBars);

  // Gradient color based on percentage
  // 0-50%: Red to Orange/Yellow
  // 50-100%: Yellow to Green
  // 100%+: Solid Green
  let emoji;

  if (percentage >= 100) {
    emoji = "🟢"; // Solid green circle for 100%+
  } else if (percentage >= 75) {
    emoji = "🟡"; // Yellow-green (transitioning)
  } else if (percentage >= 50) {
    emoji = "🟡"; // Yellow
  } else if (percentage >= 25) {
    emoji = "🟠"; // Orange
  } else {
    emoji = "🔴"; // Red circle
  }

  return `${emoji} ${filled}${empty}`;
}

// Create Discord client
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Define commands
const commands = [
  {
    name: "link",
    description: "Link your Discord account to your game ID",
    options: [
      {
        name: "id",
        type: 3, // STRING type
        description: "Your in-game Governor ID",
        required: true,
      },
    ],
  },
  {
    name: "stats",
    description: "View your KOAB stats",
  },
  {
    name: "unlink",
    description: "Unlink your Discord account from your game ID",
  },
];

// Register slash commands
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

// Handle interactions
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, user } = interaction;

  if (commandName === "link") {
    // Defer reply immediately to prevent timeout
    await interaction.deferReply({ ephemeral: false });

    const governorId = interaction.options.getString("id");

    // Validate that ID exists in data
    const stats = getPlayerStats(governorId);
    if (!stats) {
      await interaction.editReply({
        content: `❌ Governor ID \`${governorId}\` not found in the database. Please check your ID and try again.`,
      });
      return;
    }

    // Link user
    userLinks[user.id] = governorId;
    saveUserLinks();

    const playerName = stats["Governor Name"] || stats["Name"] || "Unknown";
    await interaction.editReply({
      content: `✅ Successfully linked your Discord account to **${playerName}** (ID: \`${governorId}\`)`,
    });
  } else if (commandName === "unlink") {
    if (!userLinks[user.id]) {
      await interaction.reply({
        content: "❌ Your Discord account is not linked to any game ID.",
        ephemeral: false,
      });
      return;
    }

    delete userLinks[user.id];
    saveUserLinks();

    await interaction.reply({
      content: "✅ Successfully unlinked your Discord account.",
      ephemeral: false,
    });
  } else if (commandName === "stats") {
    // Defer reply immediately to prevent timeout
    await interaction.deferReply({ ephemeral: false });

    const governorId = userLinks[user.id];

    if (!governorId) {
      await interaction.editReply({
        content:
          "❌ You need to link your account first! Use `/link <id>` to link your game ID.",
      });
      return;
    }

    const stats = getPlayerStats(governorId);
    if (!stats) {
      await interaction.editReply({
        content: "❌ Unable to retrieve your stats. Please contact an admin.",
      });
      return;
    }

    // Build stats embed
    const playerName = stats["Governor Name"] || stats["Name"] || "Unknown";
    const power = stats["Power"] || 0;
    const killPoints = stats["Kill Points"] || 0;
    const requiredKP = stats["Required KP"] || 0;
    const deads = stats["Deads"] || 0;
    const requiredDeads = stats["Required Deads"] || 0;

    const embed = new EmbedBuilder()
      .setTitle(`📊 KOAB Stats: ${playerName}`)
      .setColor(0x9333ea) // Purple color
      .addFields(
        { name: "🆔 Governor ID", value: `\`${governorId}\``, inline: true },
        { name: "⚡ Starting Power", value: formatNumber(power), inline: true },
        { name: "\u200b", value: "\u200b", inline: true }, // Spacer
        {
          name: "⚔️ Starting Kill Points",
          value: formatNumber(killPoints),
          inline: true,
        },
        {
          name: "🎯 Required KP",
          value: formatNumber(requiredKP),
          inline: true,
        },
        { name: "\u200b", value: "\u200b", inline: true }, // Spacer
        { name: "💀 Starting Deads", value: formatNumber(deads), inline: true },
        {
          name: "📋 Required Deads",
          value: formatNumber(requiredDeads),
          inline: true,
        },
        { name: "\u200b", value: "\u200b", inline: true } // Spacer
      );

    // Add KVK stats if deltas available
    if (stats.deltas) {
      const kvkFields = [];

      if (stats.deltas["Kill Points"]) {
        const delta = stats.deltas["Kill Points"];
        const percentage =
          requiredKP > 0 ? ((delta / requiredKP) * 100).toFixed(1) : 0;
        const progressBar = createProgressBar(percentage);
        kvkFields.push({
          name: "⚔️ Kill Points This KVK",
          value: `${delta > 0 ? "+" : ""}${formatNumber(
            delta
          )}\n${progressBar} **${percentage}%** of required`,
          inline: false,
        });
      }

      if (stats.deltas["Deads"]) {
        const delta = stats.deltas["Deads"];
        const percentage =
          requiredDeads > 0 ? ((delta / requiredDeads) * 100).toFixed(1) : 0;
        const progressBar = createProgressBar(percentage);
        kvkFields.push({
          name: "💀 Deads This KVK",
          value: `${delta > 0 ? "+" : ""}${formatNumber(
            delta
          )}\n${progressBar} **${percentage}%** of required`,
          inline: false,
        });
      }

      if (kvkFields.length > 0) {
        embed.addFields({
          name: "\n📈 Stats This KVK",
          value: "\u200b",
          inline: false,
        });
        embed.addFields(...kvkFields);
      }
    }

    embed.setFooter({
      text: "💡 Note: Dead requirements % assumes all deads are T5 and non-siege. T4 and Siege are worth half as much.",
    });
    embed.setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
});

client.once("ready", () => {
  console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
