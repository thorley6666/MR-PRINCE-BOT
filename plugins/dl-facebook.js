
import fg from 'api-dylux';
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  
if (!args[0]) throw `✳️ Provide Facebook Link\n\n📌 EXAMPLE:\n*${usedPrefix + command}* past your fb video url`
  m.react(rwait)

  try {
  let res = await fetch(global.API('fgmods', '/api/downloader/fbdl', { url: args[0] }, 'apikey'))
  let data = await res.json()

  if (res.status !== 200) {
    m.reply(`Error: ${res.status} ${res.statusText}`)
  } else {
   
    conn.sendFile(m.chat, data.result.HD, 'fb.mp4', `Here is your video`, m)
    m.react(done)
  }
} catch (error) {
  m.reply(error)
}
}
handler.help = ['facebook'].map(v => v + ' <url>')
handler.tags = ['dl']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i

export default handler
