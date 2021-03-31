const database = require('../database');
const options = require('../options');

function execute(user, msg) {
  if (msg === "1") {
    database[user].stage = 3;
    return [`Muito legal que você queira saber mais, para realizar a sua matrícula não é necessário a entrega de documentos, basta acessar o e-commerce da FECAP e finalizar o pedido!\nÉ só acessar este link: http://portal.fecap.br/framehtml/web/app/Edu/PortalProcessoSeletivo/?c=1&f=1&ps=23&ai=&#/es/inscricoeswizard/dados-basicos`];
  }

  if (msg === "0") {
    database[user].stage = 1;
    let menu = "";

    Object.keys(options.menu).forEach((value) => {
      let element = options.menu[value];
      menu += `${value} - ${element.descricao} \n`;
    });

    return [menu];
  }

  if (msg === "0") {
    database[user].stage = 0;
    return [`Qual dos assuntos você gostaria de abordar?`, menu];
  }

  /*  let resumo = "  RESUMO DO PEDIDO \n";
   let total = 0;
   database[user].itens.forEach((value) => {
     console.log(value);
     resumo += `${value.descricao} ----------------  ${value.preco} \n`;
 
     total += value.preco;
   });
 
   resumo += "-------------------------\n";
   resumo += ` Total R$ ${total}`; */

  return ["Para confirmar digite # ou para cancelar digite * "];
}

exports.execute = execute;
