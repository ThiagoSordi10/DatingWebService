const redis = require('redis');
const manipulaLista = require('./manipula-lista');

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const allowlist = redis.createClient({ prefix: 'allowlist-refresh-token:', host: REDIS_HOST, port: REDIS_PORT,
password: REDIS_PASSWORD });

module.exports = manipulaLista(allowlist);