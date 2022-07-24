import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('return pong')

export const execute = async (interaction: CommandInteraction) => {
  return interaction.reply('va toma no seu cu')
}
