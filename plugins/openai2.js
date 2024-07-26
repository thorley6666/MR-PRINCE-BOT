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

    const guru1 = `https://ultimetron.guruapi.tech/gpt3?prompt=${prompt}`;
    try {
      let response = await fetch(guru1);
      let data = await response.json();
      let result = data.result;
      if (!result) {   
        throw new Error('No valid JSON response from the API');
      }
      m.react(done);
    } catch (error) {
      console.error('Error:', error);
    throw `*ERROR*`;
  }
};

handler.command = ['openai'];
handler.diamond = false;

export default handler;
