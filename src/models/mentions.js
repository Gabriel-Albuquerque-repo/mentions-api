const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const esquema = {
  type: String,
  required: true,
  trim: true
  }

const mentionSchema = new Schema({
  friend: esquema,
  mention: esquema
},/* {collection: 'queirozs'}, */ {strict: false});

const loginSchema = new Schema({
  login: esquema,
  senha: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    /* default: Date.now */
  }
}, /* {collection: 'queirozs'}, */{strict: false});

//strict serve para pegar propriedades que não foram
//especificadas aqui no schema, mas precisam ser tratadas
//na parte do controller com o req.body.newProperty

const mention = mongoose.model('Mention', mentionSchema,);
const login = mongoose.model('Login', loginSchema);

module.exports = {
    mention,
    login
};

/* module.exports = mention; */
