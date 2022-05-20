const db = require('../../database');
const { InternalServerError } = require('../erros');

const { promisify } = require('util');
const dbRun = promisify(db.run).bind(db);
const dbGet = promisify(db.get).bind(db);
const dbAll = promisify(db.all).bind(db);

module.exports = {
  async adiciona(pergunta) {
    try {
      await dbRun(`INSERT INTO perguntas (pergunta) VALUES (?)`, [
        pergunta.pergunta,
      ]);
    } catch (erro) {
      throw new InternalServerError('Erro ao adicionar o pergunta!');
    }
  },

  async buscaPorId(id) {
    try {
      return await dbGet(`SELECT * FROM perguntas WHERE id = ?`, [id]);
    } catch (erro) {
      throw new InternalServerError('Não foi possível encontrar o usuário!');
    }
  },

  async lista() {
    try {
      return await dbAll(`SELECT * FROM perguntas`);
    } catch (erro) {
      throw new InternalServerError('Erro ao listar as perguntas!');
    }
  }
};
