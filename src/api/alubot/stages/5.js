const database = require("../database");
let internState = 0;

function execute(user, msg) {
  //banco.db[user].stage = 0;

  if (internState === 1) {
    database[user].stage = 4;

    return stages.step[4].obj.execute(user, "");
  }
  if (msg === "1") {
    internState++;
    return ["Digite o valor em dinheiro para levarmos o troco: "];
  }
  return ["Escolha a forma de pagamento:\n1️⃣-Dinheiro\n2️⃣-Cartão"];
}

exports.execute = execute;
