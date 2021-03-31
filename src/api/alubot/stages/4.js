const database = require('../database');

function execute(user, msg) {
  database[user].stage = 0;
  return [
    "Obrigado pela preferencia.",
    "Aguarde, seu pedido chegará em breve",
    "Mais informações ligue para 33333-3311",
  ];
}

exports.execute = execute;
