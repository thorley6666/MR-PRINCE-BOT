import fetch from 'node-fetch';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  // Check if text is provided or if a message is quoted
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `❇️𝙀𝙭𝙖𝙢𝙥𝙡𝙚:\n *_${usedPrefix + command} What is islam?_*`;
  }

  // If text is not provided, use the quoted message's text
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    // Send a "typing" presence update
    m.react(rwait);
    conn.sendPresenceUpdate('composing', m.chat);

    // Encode the text as a URL parameter
    const prompt = encodeURIComponent(text);

    // Construct the API URL
    const guru1 = `https://ultimetron.guruapi.tech/gpt3?prompt=${prompt}`;

    try {
      // Fetch the API response
      let response = await fetch(guru1);

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response as JSON
      let data = await response.json();

      // Check if the response contains a result
      if (!data.result) {
        throw new Error('No valid JSON response from the API');
      }

      // Send the result as a message
      m.reply(data.result);

      // Send a "done" reaction
      m.react(done);
    } catch (error) {
      // Log the error and send an error message
      console.error('Error:', error);
      throw `*ERROR*: ${error.message}`;
    }
  } catch (error) {
    // Log the error and send an error message
    console.error('Error:', error);
    throw `*ERROR*: ${error.message}`;
  }
};

handler.command = ['openai'];
handler.diamond = false;

export default handler;
