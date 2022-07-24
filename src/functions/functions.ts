import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice'
import { VoiceChannel } from 'discord.js'

const audioPlayer = createAudioPlayer()

export const playAudio = (channel: VoiceChannel, path: string) =>
  new Promise<void>((resolve, reject) => {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guildId,
      adapterCreator: channel.guild.voiceAdapterCreator,
    })

    const audio = createAudioResource(path)

    const subscription = connection.subscribe(audioPlayer)

    subscription?.player.play(audio)

    console.log(`playando em ${channel.name}`)

    audioPlayer.on(AudioPlayerStatus.Idle, () => {
      subscription?.unsubscribe()
      connection.disconnect()
      resolve()
    })
  })
