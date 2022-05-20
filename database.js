const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');

const PERGUNTAS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS perguntas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pergunta VARCHAR(100) NOT NULL
  )
  `;

const USUARIOS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senhaHash VARCHAR(255) NOT NULL,
    genero VARCHAR(40) NOT NULL,
    generoPreferencia VARCHAR(40) NOT NULL
  )
  `;


  const RESPOSTAS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS respostas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    resposta VARCHAR(150) NOT NULL,
    perguntaId INTEGER NOT NULL,
    usuarioId INTEGER NOT NULL,
    FOREIGN KEY(perguntaId) REFERENCES perguntas(id),
    FOREIGN KEY(usuarioId) REFERENCES usuarios(id)
  )
  `;

db.serialize(() => {
  db.run('PRAGMA foreign_keys=ON');
  db.run(PERGUNTAS_SCHEMA);
  db.run(USUARIOS_SCHEMA);
  db.run(RESPOSTAS_SCHEMA);
});

process.on('SIGINT', () =>
  db.close(() => {
    process.exit(0);
  })
);

module.exports = db;
