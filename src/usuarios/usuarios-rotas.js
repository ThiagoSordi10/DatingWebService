const usuariosControlador = require('./usuarios-controlador');
const middlewaresAutenticacao = require('./middlewares-autenticacao');

module.exports = (app) => {
  app
    .route('/usuario/atualiza_token')
    .post(middlewaresAutenticacao.refresh, usuariosControlador.login);

  app
    .route('/usuario/login')
    .post(middlewaresAutenticacao.local, usuariosControlador.login);

  app
    .route('/usuario/logout')
    .post([middlewaresAutenticacao.refresh, middlewaresAutenticacao.bearer], usuariosControlador.logout);

  app
    .route('/usuario')
    .post(usuariosControlador.adiciona)
    .get(middlewaresAutenticacao.bearer, usuariosControlador.get);

    app
    .route('/semelhantes')
    .get(middlewaresAutenticacao.bearer, usuariosControlador.semelhantes);

  app
    .route('/usuario/:id')
    .delete(middlewaresAutenticacao.bearer, usuariosControlador.deleta);
};
