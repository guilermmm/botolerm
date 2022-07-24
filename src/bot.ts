import { Client, Collection, VoiceChannel } from 'discord.js'
import path from 'path'
import * as commandModules from './commands'
import config from './config'
import { playAudio } from './functions/functions'

export const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'DIRECT_MESSAGES',
    'GUILD_VOICE_STATES',
    'GUILD_MESSAGE_REACTIONS',
  ],
})

client.once('ready', () => {
  console.log('ye connected to discrod')
  console.log('sdaasgfsdsfgdfsdg')

  const delay = 60 * 60 * 1000

  const ringBell = async () => {
    const server = client.guilds.cache.get(config.GUILD_ID)

    const channels = await server?.channels.fetch()

    const voiceChannels = channels?.filter(voiceChannel => {
      return voiceChannel.type === 'GUILD_VOICE'
    }) as Collection<string, VoiceChannel>

    for (const [, channel] of voiceChannels) {
      if (channel.members.size) {
        await playAudio(channel, path.join(__dirname, './resources/bell.m4a'))
      }
    }

    const start = delay - (Date.now() % delay)
    setTimeout(ringBell, start)
  }
  const start = delay - (Date.now() % delay)
  setTimeout(ringBell, start)
})

const commands = Object(commandModules)

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) {
    return
  }

  const { commandName } = interaction
  commands[commandName].execute(interaction)
})

client.on('messageCreate', async message => {
  if (message.author.id !== client.user?.id && Math.random() < 0.1) {
    message.react('🐂')
  }

  // if (message.author.id !== client.user?.id && Math.random() < 0.1) {
  //   message.reply(`<@${message.author.id}> si diverte 😂😂😂`)
  // }

  const msg = message.content.split(' ')

  if (message.author.id !== client.user?.id && msg.indexOf('bot') + 1) {
    const bot = msg.indexOf('bot')

    if (msg[bot + 1] === 'bot' || msg[bot + 2] === 'bot') {
      return
    }

    if (msg[bot + 1] === 'é' || msg[bot + 1] === 'e') {
      message.reply(`${msg[bot + 2]} é tu`)
      return
    }

    message.reply(`${msg[bot + 1]} é tu`)
  }

  if (message.content === 'x') {
    message.author.send(
      'https://pbs.twimg.com/media/FRRyk_RXwAMtFve?format=jpg&name=900x900',
    )
  }

  if (message.content === 'afirmativo') {
    message.reply(
      'https://cdn.discordapp.com/attachments/978843159230550086/979550924148187196/unknown.png',
    )
  }

  if (message.content === 'positivo') {
    message.reply(
      'https://imageproxy.ifunny.co/crop:x-20,resize:640x,quality:90x75/images/7119b88e36b80b097053c358af9f23cae9361ebddc48309b931cf224dba2be2c_1.jpg',
    )
  }

  if (message.content === 'reage') {
    message.react('1️⃣')
    message.react('2️⃣')
    message.react('3️⃣')
    message.react('4️⃣')
    message.react('5️⃣')
    message.react('6️⃣')

    message
      .awaitReactions({
        filter: (reaction, user) => {
          return (
            ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'].includes(
              reaction.emoji.name!,
            ) && user.id === message.author.id
          )
        },
        max: 1,
        time: 20000,
        errors: ['time'],
      })
      .then(collected => {
        const reaction = collected.first()

        if (reaction!.emoji.name === '1️⃣') {
          message.reply('You reacted with a one.')
        } else {
          message.reply('pau no seu cu.')
        }
      })
      .catch(collected => {
        message.reply('baiano')
      })
  }
})

client.login(config.DISCORD_TOKEN)
