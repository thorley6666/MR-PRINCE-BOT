import fetch from 'node-fetch';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `❇️𝙀𝙭𝙖𝙢𝙥𝙡𝙚:\n *_${usedPrefix + command} What is islam?_*`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }
  try {
    m.react(rwait)
    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);

    const guru1 = await fetch(global.API('fgmods', '/api/info/gemini', { prompt }, 'apikey'));
    try {
      let response = guru1;
      let data = await response.json();
      let result = data.result;
      if (!result) {   
        throw new Error('No valid JSON response from the API');
      }
      m.react(done);
      // You were missing the part where you send the result back to the user
      m.reply(result);
    } catch (error) {
      console.error('Error:', error);
      throw `*ERROR*`;
    }
  } catch (error) {
    console.error('Error:', error);
    throw `*ERROR*`;
  }
};

handler.help = ['gemini <text>'];
handler.tags = ['tools'];
handler.command = ['gemini'];

export default handler;
