const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError } = require('../erros');

const tokens = require('./tokens');
const Resposta = require('../respostas/respostas-modelo');


module.exports = {
  async adiciona(req, res) {
    const { nome, email, senha, genero, generoPreferencia } = req.body;
    try {
      const usuario = new Usuario({
        nome,
        email,
        genero,
        generoPreferencia
      });
      await usuario.adicionaSenha(senha);
      await usuario.adiciona();

      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        return res.status(400).json({ erro: erro.message });
      }
      res.status(500).json({ erro: erro.message });
    }
  },

  async login(req, res) {
    try {
      const accessToken = tokens.access.cria(req.user.id);
      const refreshToken = await tokens.refresh.cria(req.user.id);
      res.set('Authorization', accessToken);
      res.status(200).json({refreshToken});
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async logout(req, res) {
    try {
      const token = req.token;
      await tokens.access.invalida(token);
      res.status(204).json();
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async get(req, res) {
    try {
      const usuario = await Usuario.buscaPorId(req.user.id);
      res.json(usuario);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async semelhantes(req, res) {
    try {
      const usuario = await Usuario.buscaPorId(req.user.id);
      const respostas_usuario = await Resposta.buscaPorUsuario(req.user.id);
      const usuarios = await Usuario.lista();
      const lista_semelhanca = [];

      for(let element of usuarios){
        if(element.genero == usuario.generoPreferencia && usuario.id != element.id){
          let respostas = await Resposta.buscaPorUsuario(element.id);
          let index = 0;
          for(let el of respostas){
            if(el.resposta == respostas_usuario[index].resposta){
              lista_semelhanca.push(element);
            }
            index += 1;
          }
        }   
      }
      res.json(lista_semelhanca);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async deleta(req, res) {
    try {
      const usuario = await Usuario.buscaPorId(req.params.id);
      await usuario.deleta();
      res.status(200).json();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },
};
