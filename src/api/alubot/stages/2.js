const options = require('../options');

function execute(user, msg, contact, client) {
  let menu = "";

  Object.keys(options).forEach((value) => {
    let element = options[value];
    menu += `${value} - ${element.description} \n`;
  });

  if (msg === "0") {
    client.stage = 1;
    return [menu];
  }

  if (msg === "1") {
    client.stage = 0;
    return [`Ficamos muito felizes com seu interesse em fazer parte da FECAP!\nBasta acessar o e-commerce da FECAP e finalizar o pedido!\nEste é o link: http://portal.fecap.br/framehtml/web/app/Edu/PortalProcessoSeletivo/?c=1&f=1&ps=23&ai=&#/es/inscricoeswizard/dados-basicos\nEntão você precisa selecionar o seu curso de preferência e preencher os dados.\nSe alguma dúvida surgir no processo, pode me chamar!\nAo final, é só nos mandar o comprovante que encerraremos o atendimento.
    `];
  }

  return [
    "Desculpe, não estava esperando essa mensagem",
    "Tente novamente com alguma opção válida =)",
    "1 - Continuar para a matrícula\n0 - Retornar ao menu anterior"
  ];
}

exports.execute = execute;
