import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  /**
   * Ensure text is provided, either directly or via quoted message.
   */
  if (!text && !(m.quoted && m.quoted.text)) {
    throw ` Need query...`;
  }
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  // Send a "typing" reaction to indicate the bot is processing the request.
  m.react('⏳')

  try {
    /**
     * Make a GET request to the Gemini API with the provided text.
     */
    let gpt = await fetch(global.API('fgmods', '/api/info/gemini', { text }, 'apikey'));
    let res = await gpt.json();

    // Reply with the result from the API.
    await m.reply(res.result);
    m.react('✅') // Send a "success" reaction.
  } catch (error) {
    // Reply with an error message if the request fails.
    m.reply(` Error: Try Later`);
    console.error(error); // Log the error for debugging purposes.
  }
};

handler.help = ['gemini <text>'];
handler.tags = ['tools'];
handler.command = ['gemini'];

export default handler;
