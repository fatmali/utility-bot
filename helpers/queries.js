const { Client } = require('pg')
require('dotenv').config()

const pgClient = new Client({
  // connectionString: process.env.DATABASE_URL,
  // ssl: true
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PORT
})

module.exports = { pgClient }
