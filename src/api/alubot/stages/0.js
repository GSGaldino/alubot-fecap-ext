const options = require('../options');

function execute(user, msg, contact, client) {
  let menu = '';

  Object.keys(options).forEach(value => {
    let element = options[value];
    menu += `${value} - ${element.description}\n`
  });

  //sim
  if(msg === "SIM" || msg === "sim" || msg === "Sim" || msg === "s" || msg === "S" || msg === "Si"){
    client.stage = 1;

    return [
      `Legal! Temos bastante interesse em ter você como aluno da FECAP! 
      Qual dos assuntos você gostaria de abordar?
      `,
      menu,
    ]
  }

  //nao
  if(msg === "NAO" || msg === "nao" || msg === "Nao" || msg === "n" || msg === "N" || msg === "Na" || msg === "NÃO" || msg === "não" || msg === "Não" || msg === "ñ" || msg === "Ñ" || msg === "Nã"){

    return [
      `Que pena :( De qualquer forma estou aqui se precisar de algo!`,
    ]
  }

  return [];
}

module.exports = {execute};
