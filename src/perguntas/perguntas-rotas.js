const perguntasControlador = require('./perguntas-controlador');
const { middlewaresAutenticacao } = require('../usuarios');

module.exports = app => {
  app
    .route('/perguntas')
    .get(perguntasControlador.lista)
    .post(
      perguntasControlador.adiciona
    );;

  app
    .route('/perguntas/:id')
    .get(middlewaresAutenticacao.bearer, perguntasControlador.get);

      
};
