const Resposta = require('./respostas-modelo');
const { InvalidArgumentError } = require('../erros');

module.exports = {
  async adiciona(req, res) {
    try {
      const resposta = new Resposta(req.body, req.user);
      await resposta.adiciona();

      res.status(201).json(resposta);
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        return res.status(400).json({ erro: erro.message });
      }
      res.status(500).json({ erro: erro.message });
    }
  },

  async lista(req, res) {
    try {
      const respostas = await Resposta.lista();
      res.json(respostas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  },
};
