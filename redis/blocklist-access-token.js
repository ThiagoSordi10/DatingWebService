const redis = require('redis');

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

console.log(REDIS_HOST);

const blocklist = redis.createClient({ prefix: 'blocklist-access-token:', host: REDIS_HOST, port: REDIS_PORT,
password: REDIS_PASSWORD});
const manipulaLista = require('./manipula-lista');
const manipulaBlocklist = manipulaLista(blocklist);

const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');

function geraTokenHash(token) {
  return createHash('sha256').update(token).digest('hex');
}

module.exports = {
  async adiciona(token) {
    const dataExpiracao = jwt.decode(token).exp;
    const tokenHash = geraTokenHash(token);
    await manipulaBlocklist.adiciona(tokenHash, '', dataExpiracao);
  },
  async contemToken(token) {
    const tokenHash = geraTokenHash(token);
    return manipulaBlocklist.contemChave(tokenHash);
  },
};