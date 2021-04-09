const stages = {
  0: {
    description: "Boas vindas",
    obj: require('./stages/0'),
  },
  1: {
    description: "Menu",
    obj: require('./stages/1'),
  },
  2: {
    description: "Opções",
    obj: require('./stages/2'),
  },
  3: {
    description: "Boas vindas",
    obj: require('./stages/3'),
  }
}

module.exports = stages;
