const Pergunta = require('./perguntas-modelo');
const { InvalidArgumentError } = require('../erros');

module.exports = {
  async adiciona(req, res) {
    try {
      const pergunta = new Pergunta(req.body);
      await pergunta.adiciona();

      res.status(201).json(pergunta);
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        return res.status(400).json({ erro: erro.message });
      }
      res.status(500).json({ erro: erro.message });
    }
  },

  async get(req, res) {
    try {
      const pergunta = await Pergunta.buscaPorId(req.params.id);
      res.json(pergunta);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  },

  async lista(req, res) {
    try {
      const perguntas = await Pergunta.lista();
      res.json(perguntas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
};
