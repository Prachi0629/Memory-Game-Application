// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'memory_db',
  password: 'Krish@0629',
  port: 5432 // default PostgreSQL port
});

module.exports = pool;
