const router = require('express').Router();
const bot = require("venom-bot");
const { formatNumber } = require('./helpers');

//Set active client to global scope
let activeClient;
bot.create({ headless: true, }).then(client => activeClient = client);

router.post('/send', async (req, res) => {
  const { fullname, phone, email, course_code } = req.query;
  const message = req.query.message || "Teste de mensagem";
  const connected = await activeClient.isConnected();

  if (phone !== '11986345917') {
    console.log(phone)
    console.log(typeof phone)
    return res.json({ erro: 'Staging area!' })
  }
  if (!connected)
    return res.json(500).json({ message: 'The bot is not connected yet.' })
  if (!phone)
    return res.status(400).json({ message: 'Missing phone number to send a message!' })

  try {
    const formattedNumber = formatNumber(phone, res);
    console.log(formattedNumber)
    activeClient
      .sendText(formattedNumber, message)
      .then(result => res.send(result))
      .catch(error => res.send(error));

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'internal server error. Please check out the console for more.'
    })
  }

})

module.exports = router;
