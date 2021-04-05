const bot = require('venom-bot');
const router = require('express').Router();
const options = require('./options');
const { start, formatNumber } = require('./helpers');

const database = require('./database');

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
  let menu = '';

  Object.keys(options).forEach(value => {
    let element = options[value];
    menu += `${value} - ${element.description}\n`
  });
  const message = `Olá ${name}, aqui é a Helena, a inteligência artificial da FECAP 😊\n\nEnvio essa mensagem porque você solicitou mais informações sobre o nosso curso de ${curso}\nQuais dos assuntos você gostaria de abordar?\n\n${menu}`;
  const connected = await activeClient.isConnected();

  if (!connected) return res.json(500).json({ message: 'The bot is not connected yet.' });
  if (!phone) return res.status(400).json({ message: 'Missing phone number to send a message!' });

  try {
    const formattedNumber = formatNumber(phone, res);
    if (!database[formattedNumber]) {
      database[formattedNumber] = {
        stage: 1,
        name: name,
        curso: curso,
        inicio: inicio,
        carga_horaria: carga_horaria,
        site: site,
        value: value
      }
    }

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
