const venomBot = require('venom-bot');
const stages = require('./stages');

const Database = require('./Database');

const { firstMessage } = require('./messages');

class Alubot {
  constructor() {
    this._database = new Database;
    this._bot = venomBot.create({ headless: true }).then(client => client);
  }

  get database() {
    return this._database.numbers;
  }

  async add(client) {
    try {
      const formattedNumber = await this._formatNumber(client.phone);
      await this._database.add(formattedNumber, client);

    } catch (error) {
      throw new Error(`Alubot.add() -> ${error.message}`);
    }
  }

  async start() {
    try {
      (await this._bot)
        .onMessage(async message => {
          const stage = this._database._getStage(message.from);
          if(stage === 0 || stage === 3 || !stage)
            return 
            
          const responses = stages[stage].obj.execute(
            message.from,
            message.body,
            message.sender.pushname,
            this._database._getClient(message.from),
          );

          await this.sendMessage({
            phone: message.from,
            message: responses.join('\n')
          })
        });
    } catch (error) {
      throw new Error('Alubot.start() -> ', error)
    }
  }

  async sendMessage({ isFirstMessage, message, phone, client }) {
    //if dont have a number or dont have a message and it is first message
    if (!phone || !message && !isFirstMessage)
      throw new Error('Alubot.sendMessage() -> missing required param')

    const formattedNumber = await this._formatNumber(phone);
    if (isFirstMessage) {
      try {
        await (await this._bot).sendText(formattedNumber, firstMessage({ name: client.name, curso: client.curso }));

      } catch (error) {
        throw new Error(`Alubot.sendMessage({isFirstMessage}) -> ${error.message}`);
      }
    } else {
      try {
        const bot = await this._bot;
        await bot.sendText(formattedNumber, message);

      } catch (error) {
        throw new Error(error.message);
      }
    }
  }

  /**
  * Format the phone number to the venom-bot pattern "5511999999999@c.us"
  * @param {Number} number number that comes in request query
  * @returns {String} formatted venom-bot pattern
  */
  async _formatNumber(number) {
    const numberInString = String(number);
    const formattedNumber = `55${number}@c.us`;

    if(numberInString[numberInString.length - 1] === "s" && numberInString[numberInString.length - 2] === "u")
      return number;

    // if starts with 55
    if (numberInString[0] === '5' && numberInString[1] === '5')
      throw new Error('The number must not have "55" on start.');

    // if cannot receive messages
    if (!(await (await this._bot).checkNumberStatus(formattedNumber)).canReceiveMessage)
      throw new Error(`The number cannot receive messages ${formattedNumber}`)

    return await formattedNumber;
  };

}

module.exports = Alubot;
