const { Client } = require('pg');
var con = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'CSDB',
  password: '19121998',
  port: 5432,
})
con.connect();

module.exports = con;