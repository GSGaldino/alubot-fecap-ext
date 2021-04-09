const crypto = require('crypto');

class Client {
  constructor({ name, curso, inicio, carga_horaria, site, value, phone }) {
    if (!name || !curso || !inicio || !carga_horaria || !site || !value || !phone)
      throw new Error('create client error -> missing required param');

    this.id = crypto.randomBytes(6).toString('hex');
    this.name = name;
    this.curso = curso;
    this.inicio = inicio;
    this.carga_horaria = carga_horaria;
    this.site = site;
    this.value = value;
    this.phone = phone;

    //stage 0 used only for client first message
    this._stage = 1;
  }

  get stage(){
    return this._stage;
  }

  set stage(newValue){
    this._stage = newValue;
  }
  
}

module.exports = Client;
