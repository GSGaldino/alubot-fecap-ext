const router = require('express').Router();

const Alubot = require('./Alubot');
const Client = require('./Client');

const alubot = new Alubot();
alubot.start();

router.post('/say-hello', async (req, res) => {
  try {

    const client = new Client(req.body);
    await alubot.add(client);
    await alubot.sendMessage({
      isFirstMessage: true,
      client,
      phone: client.phone
    })

    res.json({
      status: 'success'
    })

  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: error.message
    });
  }
});

router.post('/send-message', async (req, res) => {
  const { phone, message } = req.body;
  if (!phone || !message)
    return res.status(400).json({
      message: 'missing required param!'
    })

  await alubot.sendMessage({phone, message});

  res.status(200).json({
    message: `Alubot.sendMessage() -> success sended message: ${message} to phone: ${phone}`
  });
})

module.exports = router;
