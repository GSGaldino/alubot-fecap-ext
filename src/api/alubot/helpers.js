const database = require('./database');
const stagesObject = require('./stagesObject');

/**
 * Format the phone number to the venom-bot pattern "5511999999999@c.us"
 * @param {Number} number number that comes in request query
 * @returns {String} formatted venom-bot pattern
 */
const formatNumber = (number, res) => {
  const numberInString = String(number);

  // if starts with 55
  if (numberInString[0] === '5' && numberInString[1] === '5') {
    return res.status(400).json({
      message: 'The number must not have "55" on start.',
    });
  }

  const formattedNumber = `55${number}@c.us`;
  return formattedNumber;
};

/**
 * Take sender's phone and verify in database if already exists.
 * @param {String} phone user's phone in venom-bot format e.g 5511999999999@c.us
 * @returns {Number} sender's actual stage
 */
const _getStage = phone => {
  //if number already exists
  if (database[phone]) {
    return database[phone].stage;
  }
  //If it's sender's first message
  else {
    database[phone] = {
      stage: 0,
    }
    return database[phone].stage;
  }
}

/**
 * Takes client object, start the whole flow and returns it to use globally
 * @param {Object} client client returned by create method on venom-bot
 * @returns {Object} client to use globally on application routes
 */
const start = client => {
  client.onMessage(message => {
    const stage = _getStage(message.from);
    const response = stagesObject[stage].obj.execute(
      message.from,
      message.body,
      message.sender.pushname
    );

    for (let index = 0; index < response.length; index++) {
      const element = response[index];
      client.sendText(message.from, element);
    }
  })

  return client;
};

module.exports = {
  formatNumber,
  start
};
