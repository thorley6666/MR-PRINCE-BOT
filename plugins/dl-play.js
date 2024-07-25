
import yts from 'yt-search'
let handler = async (m, { conn, command, text, usedPrefix }) => {
	
  if (!text) throw `✳️ Example: *${usedPrefix + command}* Mujy Rang de Naat`
	let res = await yts(text)
	let vid = res.videos[0]
	if (!vid) throw `✳️ Video/Audio No found`
	let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid
	//const url = 'https://www.youtube.com/watch?v=' + videoId
	m.react('🎧') 
  let play = `
	 𓆩 𓅓 𓆪 *PRINCE STUDIO*
┌──────────────
┃ 📌 *TITLE:* ${vid.title}
┃ 📆 *UPLOADED:* ${vid.ago}
┃ ⌚ *DURATION:* ${vid.timestamp}
┃ 👀 *VIEWS:* ${vid.views.toLocaleString()}
└──────────────`
 await conn.sendButton2(m.chat, play, thumbnail, [
    ['🎶 MP3', `${usedPrefix}fgmp3 ${url}`],
    ['🎥 MP4', `${usedPrefix}fgmp4 ${url}`]
  ], null, [['Channel', `${princegp}`]], m)
}
handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play', 'playvid']
handler.disabled = false

export default handler
