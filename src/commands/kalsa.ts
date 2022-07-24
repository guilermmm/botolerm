import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('kalsa')
  .setDescription('return kalsa')

export const execute = async (interaction: CommandInteraction) => {
  return interaction.reply(
    'https://tenor.com/view/galo-de-kalsa-calca-galodecalsa-galodekalsa-gif-19728436',
  )
}
