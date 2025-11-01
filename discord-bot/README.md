# 3606 Stats Discord Bot

A Discord bot that allows Kingdom 3606 members to link their accounts and view their KOAB stats.

## Features

### Slash Commands
- `/link <id>` - Link your Discord account to your in-game Governor ID
- `/stats` - View your KOAB stats including Kill Points, DKP, and changes since baseline
- `/unlink` - Unlink your Discord account

### AI Auto-Response with Memory
The bot automatically responds to messages when:
- The bot is tagged (@bot)
- User @achen1606 is tagged (requires ACHEN_USER_ID env var)
- Message contains the text "achen"

**Conversation Memory:**
- Remembers the last 10 messages per channel AND per user (hybrid memory)
- Allows for natural follow-up questions without repeating context
- Memory persists across bot restarts (stored in `/app/data/conversations.json`)

The AI uses OpenAI's **GPT-5 mini** and is informed about Rise of Kingdoms and Kingdom 3606 context to provide relevant responses about gameplay, alliance strategy, and kingdom matters.

## Setup

### 1. Create a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section and click "Add Bot"
4. Enable these Privileged Gateway Intents:
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT
5. Copy your bot token
6. Go to "OAuth2" > "URL Generator"
   - Select scopes: `bot`, `applications.commands`
   - Select permissions: `Send Messages`, `Use Slash Commands`
   - Copy the generated URL and use it to invite the bot to your server

### 2. Configure the Bot

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your `.env` file:
   ```
   DISCORD_TOKEN=your_bot_token_from_discord_portal
   CLIENT_ID=your_application_id_from_discord_portal
   GUILD_ID=your_discord_server_id
   OPENAI_API_KEY=your_openai_api_key
   ACHEN_USER_ID=your_discord_user_id
   ```

   **How to get these values:**
   - **DISCORD_TOKEN**: From Discord Developer Portal > Bot section
   - **CLIENT_ID**: From Discord Developer Portal > General Information (Application ID)
   - **GUILD_ID**: Enable Developer Mode in Discord (User Settings > Advanced), then right-click your server and select "Copy Server ID"
   - **OPENAI_API_KEY**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
   - **ACHEN_USER_ID**: Right-click your Discord username and select "Copy User ID" (requires Developer Mode)

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Bot

Development mode (auto-restart on changes):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Usage

### For Members

1. **Link your account:**
   ```
   /link 123456789
   ```
   Replace `123456789` with your Governor ID from the game.

2. **View your stats:**
   ```
   /stats
   ```
   This will show your Kill Points, Required KP, DKP, and any changes since the baseline.

3. **Unlink your account:**
   ```
   /unlink
   ```

### For Admins

- User linkages are stored in `user-links.json`
- The bot reads from Excel files in the bot directory:
  - `KOAB3606.xlsx` (baseline data)
  - `updated_stats.xlsx` (current data)
- **To update stats data:**
  1. Replace the Excel files in the discord-bot folder
  2. Commit and push to GitHub
  3. Render will auto-deploy the updates (or restart the bot if running locally)

## Data Storage

- `user-links.json` - Stores Discord User ID to Governor ID mappings
- This file is created automatically and should be backed up regularly

## Troubleshooting

**Commands not showing up:**
- Make sure the bot has been invited with the `applications.commands` scope
- Wait a few minutes for Discord to register the commands
- Try kicking and re-inviting the bot

**"ID not found" error:**
- Verify the Governor ID exists in the KOAB3606.xlsx file
- Check that the file paths in index.js are correct

**Bot not responding:**
- Check the console for errors
- Verify your `.env` file has the correct token and IDs
- Make sure the bot has permissions to respond in the channel
