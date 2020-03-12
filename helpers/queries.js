const { Client } = require('pg')
require('dotenv').config()

const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

module.exports = { pgClient }
