const perguntasDao = require('./perguntas-dao');

class Pergunta {
  constructor(pergunta) {
    this.pergunta = pergunta.pergunta;
  }

  adiciona() {
    return perguntasDao.adiciona(this);
  }

  static async buscaPorId(id) {
    const pergunta = await perguntasDao.buscaPorId(id);
    if (!pergunta) {
      return null;
    }

    return new Pergunta(pergunta);
  }

  static lista() {
    return perguntasDao.lista();
  }
}

module.exports = Pergunta;
