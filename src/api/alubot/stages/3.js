const database = require('../database');
const stages = require('../stagesObject');

function execute(user, msg) {
  if (msg === "1") {
    database[user].stage = 0;
    return [`Ficamos muito felizes com seu interesse em fazer parte da FECAP!\nBasta acessar o e-commerce da FECAP e finalizar o pedido!\nEste é o link: http://portal.fecap.br/framehtml/web/app/Edu/PortalProcessoSeletivo/?c=1&f=1&ps=23&ai=&#/es/inscricoeswizard/dados-basicos\nEntão você precisa selecionar o seu curso de preferência e preencher os dados.\nSe alguma dúvida surgir no processo, pode me chamar!\nAo final, é só nos mandar o comprovante que encerraremos o atendimento.
    `];
  }

  if (msg === "*") {
    database[user].stage = 0;
    return ["Cancelado."]
  }

  if (msg === "#") {
    database[user].stage = 0;
    return ["Erro"]
    /* 
        return stages.step[5].obj.execute(user, ""); */
  }
  return [
    `Mensagem : \n ${msg}`,
    "```Digite # para continuar ou * para cancelar```",
  ];
}

module.exports = { execute };
