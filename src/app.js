const fs = require('fs');
const config = require('./config');
const { createPgClient, closePgClient } = require('./lib/pg-client');

(async () => {
  try {
    console.log('run');
    const startTime = Date.now();

    const client = await createPgClient();

    // get all tables
    const { rows } = await client.query('select table_name, table_schema from information_schema.tables');
    const tables = rows
      .filter(row => row.table_schema === 'public' && !config.tables.ignore.includes(row.table_name))
      .map(row => row.table_name);

    // get all data
    const data = {};
    for (const table of tables) {
      const { rows } = await client.query(`select * from ${table}`);
      data[table] = rows;
    }

    // dump to json file
    fs.writeFileSync('./dump.json', JSON.stringify(data, null, 2));

    const endTime = Date.now();
    console.log({ time: `${(endTime - startTime) / 1000}s`, tables: tables.length, rows: Object.values(data).flat().length });
    console.log('all done');
  } catch (err) {
    console.log('======= ERROR =======');
    console.error(err);
  } finally {
    await closePgClient();
  }
})();
