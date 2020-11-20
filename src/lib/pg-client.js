const config = require('../config');
const { Client } = require('pg');

let client = null;

const createPgClient = async () => {
  if (client === null) {
    client = new Client({
      ...config.connection.postgres,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();
  }
  return client;
};

const closePgClient = async () => {
  if (client !== null) {
    await client.end();
    client = null;
  }
};

module.exports = {
  createPgClient,
  closePgClient,
};
