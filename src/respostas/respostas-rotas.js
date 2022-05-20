const respostasControlador = require('./respostas-controlador');
const { middlewaresAutenticacao } = require('../usuarios');

module.exports = app => {
  app
    .route('/resposta')
    .get(respostasControlador.lista)
    .post(
      middlewaresAutenticacao.bearer,
      respostasControlador.adiciona
    );
};
