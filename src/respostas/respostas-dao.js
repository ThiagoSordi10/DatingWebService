const db = require('../../database');
const { InternalServerError } = require('../erros');

const { promisify } = require('util');
const dbRun = promisify(db.run).bind(db);
const dbGet = promisify(db.get).bind(db);
const dbAll = promisify(db.all).bind(db);

module.exports = {
  async adiciona(resposta) {
    try {
      await dbRun(`INSERT INTO respostas (resposta, perguntaId, usuarioId) VALUES (?, ?, ?)`, [
        resposta.resposta,
        resposta.perguntaId,
        resposta.usuarioId
      ]);
    } catch (erro) {
      throw new InternalServerError('Erro ao adicionar a resposta!');
    }
  },

  async buscaPorUsuario(user_id) {
    try {
      return await dbAll(`SELECT * FROM respostas WHERE usuarioId = ? ORDER BY id`, [user_id]);
    } catch (erro) {
      throw new InternalServerError('Não foi possível encontrar as respostas!');
    }
  },

  async lista() {
    try {
      return await dbAll(`SELECT * FROM respostas`);
    } catch (erro) {
      throw new InternalServerError('Erro ao listar as respostas!');
    }
  }
};
