const perguntas = require('./src/perguntas');
const respostas = require('./src/respostas');
const usuarios = require('./src/usuarios');

module.exports = app => {
  perguntas.rotas(app);
  usuarios.rotas(app);
  respostas.rotas(app);
};