const options = require('../options');
const database = require('../database');

function execute(user, msg, contact) {
  let menu = '';

  Object.keys(options).forEach(value => {
    let element = options[value];
    menu += `${value} - ${element.description}\n`
  });

  //sim
  if(msg === "SIM" || msg === "sim" || msg === "Sim" || msg === "s" || msg === "S" || msg === "Si"){
    database[user].stage = 1;

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


  //...
  database[user].stage = 1;

  return [
    `Olá ${contact} Eu sou Helena da FECAP. 
    Meu papel é te ajudar! Temos bastante interesse em ter você como aluno da FECAP! 
    Qual dos assuntos você gostaria de abordar? 
    `,
    menu,
  ];
}

module.exports = {execute};
