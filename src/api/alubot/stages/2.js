const database = require('../database');
const options = require('../options');

function execute(user, msg) {
  let menu = "";

  Object.keys(options).forEach((value) => {
    let element = options[value];
    menu += `${value} - ${element.description} \n`;
  });

  if (msg === "0") {
    database[user].stage = 1;
    return [menu];
  }


  if (msg === "1") {
    database[user].stage = 3;
    return [`Muito legal que você queira saber mais, para realizar a sua matrícula não é necessário a entrega de documentos, basta acessar o e-commerce da FECAP e finalizar o pedido!\nÉ só acessar este link: http://portal.fecap.br/framehtml/web/app/Edu/PortalProcessoSeletivo/?c=1&f=1&ps=23&ai=&#/es/inscricoeswizard/dados-basicos`];
  }

  return [
    "Desculpe, não estava esperando essa mensagem",
    "Tente novamente com alguma opção válida =)",
    "1 - Continuar para a matrícula\n0 - Retornar ao menu anterior"
  ];
}

exports.execute = execute;
