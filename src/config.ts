import dotenv from 'dotenv'
dotenv.config()

const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env

if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN) {
  throw new Error('Missing env')
}

const config = {
  CLIENT_ID,
  GUILD_ID,
  DISCORD_TOKEN,
}

export default config
