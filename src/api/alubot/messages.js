const options = require('./options');

let menu = '';

Object.keys(options).forEach(value => {
  let element = options[value];
  menu += `${value} - ${element.description}\n`
});

const firstMessage = ({ name, curso }) => (
  `Olá ${name}, aqui é a Helena, a inteligência artificial da FECAP 😊\n\nEnvio essa mensagem porque você solicitou mais informações sobre o nosso curso de ${curso}\nQuais dos assuntos você gostaria de abordar?\n\n${menu}`
)

module.exports = { firstMessage };
