require('dotenv').config();

module.exports = {
  connection: {
    mysql: {
      user: process.env.MYSQL_USER,
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      password: process.env.MYSQL_PASSWORD,
      port: Number(process.env.MYSQL_PORT),
    },
    postgres: {
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: Number(process.env.PG_PORT),
    },
  },
  tables: {
    ignore: ['SequelizeMeta'],
  },
};
