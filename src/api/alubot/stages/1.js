const options = require('../options');
const database = require('../database');

function execute(user, msg) {
  let menu = '';

  Object.keys(options).forEach(value => {
    let element = options[value];
    menu += `${value} - ${element.description}\n`
  });

  if (msg === "0") {
    database[user].stage = 0;
    return [menu];
  }

  if (msg === "1" || msg === "SIM" || msg === "sim" || msg === "s" || msg === "S") {
    database[user].stage = 2;
    return [
      `Muito legal que você queira saber mais, confira aqui algumas informações:\n*Seu curso de interesse:* ${database[user].curso}\n*Modalidade:* Online\n*Início:* ${database[user].inicio}\n*Carga horária:* ${database[user].carga_horaria}\nAs aulas são gravadas, para que você consiga fazer os estudos no seu tempo!\nPara mais informações você pode acessar nosso site: *${database[user].site}*
      `,
      `Está pront@ para seguir para a matrícula? Se sim, é só  responder com o número 1! Se quiser retornar ao menu anterior responda com o número 0`,
    ];;
  }

  if(msg === "2"){
    database[user].stage = 2;
    return [
      `Okay. O curso está saindo por ${database[user].value}. Você pode pagar em até 6x no cartão de crédito ou no boleto à vista. Se quiser mais opções de pagamento basta entrar nesse link http://portal.fecap.br/framehtml/web/app/Edu/PortalProcessoSeletivo/?c=1&f=1&ps=23&ai=&#/es/inscricoeswizard/dados-basicos e seguir as instruções.`,
      `Está pront@ para seguir para a matrícula? Se sim, é só  responder com o número 1! Se quiser retornar ao menu anterior responda com o número 0`,
    ]
  }

  if(msg === "3"){
    database[user].stage = 2;
    return [
      `Muito legal que você queira saber mais, para realizar a sua matrícula não é necessário a entrega de documentos, basta acessar o e-commerce da FECAP e finalizar o pedido!\nÉ só acessar este link:  http://portal.fecap.br/framehtml/web/app/Edu/PortalProcessoSeletivo/?c=1&f=1&ps=23&ai=&#/es/inscricoeswizard/dados-basicos`,
      `Está pront@ para seguir para a matrícula? Se sim, é só  responder com o número 1! Se quiser retornar ao menu anterior responda com o número 0`,
    ]
  }

  if(msg === "4"){
    database[user].stage = 0;
    return [
      `Escreva ou grave um áudio que vamos direcionar para um consultor!`,
    ]
  }

  if (msg === "informacoes" || msg === "Informacoes" || msg === "informações" || msg === "Informações") {
    return [`Para mais informações você pode acessar nosso site ${database[user].site}`];
  }

  if (!options[msg]) {
    return [
      "Desculpe, não estava esperando essa mensagem",
      "Tente novamente com alguma opção válida =)",
    ];
  }

  database[user].itens.push(options.menu[msg]);

  return
}

exports.execute = execute;
