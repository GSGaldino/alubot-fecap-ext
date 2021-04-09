class Database {

  constructor() {
    this._database = {};
  }

  get numbers() {
    return this._database;
  }

  add(number, client) {

    try {
      this._database[number] = client;
    } catch (error) {
      throw new Error(`Database.add() -> error.${error.message}`);
    }

  }

  changeStage(number, stage) {

    try {
      this._database[number].stage = stage;

    } catch (error) {
      throw new Error(`Database.changeState() -> ${error.message}`)
    }
  }

  _getStage(formattedNumber) {
    try {
      if (this.numbers[formattedNumber])
        return this.numbers[formattedNumber].stage
    } catch (error) {
      throw new Error(`Database._getStage() -> ${error.message}`)
    }
  }

  _getClient(formattedNumber){
    try {
      if(this.numbers[formattedNumber])
        return this.numbers[formattedNumber]
    } catch (error) {
      throw new Error(`Database._getClient() -> ${error.message}`)
    }
  }

}

module.exports = Database;
