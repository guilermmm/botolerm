import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('display help')

export const execute = async (interaction: CommandInteraction) => {
  return interaction.reply(
    'https://tenor.com/view/reading-monkey-glasses-off-serious-gif-15162138',
  )
}
