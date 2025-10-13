import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';

config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🗑️  Deleting all guild commands...');

    // Delete all guild commands
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: [] }
    );

    console.log('✅ Successfully deleted all guild commands.');

    console.log('🗑️  Deleting all global commands...');

    // Delete all global commands
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: [] }
    );

    console.log('✅ Successfully deleted all global commands.');
    console.log('\n🎉 All old commands cleared! Now run "npm start" to register new commands.');
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
