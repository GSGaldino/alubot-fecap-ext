const express = require('express');

const emojis = require('./emojis');
const alubot = require('./alubot');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API'
  });
});

router.use('/emojis', emojis);
router.use('/alubot', alubot);

module.exports = router;
