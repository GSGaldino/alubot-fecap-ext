const bot = require('venom-bot');
const router = require('express').Router();
const { start, formatNumber } = require('./helpers');

// Set active client to global scope
let activeClient;
bot.create({ headless: true, }).then((client) => activeClient = start(client));

router.post('/say-hello', async (req, res) => {
  const {
    id,
    name,
    curso,
    inicio,
    carga_horaria,
    site,
    value,
    phone
  } = req.body;
  const message = `Olá, aqui é a Helena, a inteligência artificial da FECAP 😊\nEstou mandando essa mensagem porque você solicitou mais informações sobre um de nossos cursos;\nVocê ainda tem interesse em saber mais informações? Responda SIM para continuarmos o bate-papo.`;
  const connected = await activeClient.isConnected();

  if (!connected) return res.json(500).json({ message: 'The bot is not connected yet.' });
  if (!phone) return res.status(400).json({ message: 'Missing phone number to send a message!' });

  try {
    const formattedNumber = formatNumber(phone, res);
    console.log(formattedNumber)
    activeClient
      .sendText(formattedNumber, message)
      .then((result) => res.json({
        status: 'success',
        data: {
          phone: phone,
          id: id || undefined,
          name: name || undefined,
          curso: curso || undefined,
          inicio: inicio || undefined,
          carga_horaria: carga_horaria || undefined,
          site: site || undefined,
          value: value || undefined,
        }
      }))
      .catch((error) => res.status(500).json({
        error: 'activeClient.sendText() -> Error sending message.'
      }));

  } catch (error) {
    /* eslint-disable no-console */
    console.log(error);
    /* eslint-enable no-console */
    res.status(500).json({
      message: 'internal server error. Please check out the console for more.'
    });
  }
});

module.exports = router;
