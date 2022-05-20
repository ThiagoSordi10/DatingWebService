const respostasDao = require('./respostas-dao');
const validacoes = require('../validacoes-comuns');

class Resposta {
  constructor(resposta, user) {
    this.resposta = resposta.resposta;
    this.perguntaId = resposta.perguntaId;
    this.usuarioId = user.id;
    this.valida();
  }

  adiciona() {
    return respostasDao.adiciona(this);
  }

  static buscaPorUsuario(user_id){
    return respostasDao.buscaPorUsuario(user_id);
  }

  valida() {
    validacoes.campoStringNaoNulo(this.resposta, 'resposta');
  }

  static lista() {
    return respostasDao.lista();
  }
}

module.exports = Resposta;
