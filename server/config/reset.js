import 'dotenv/config'
import { pool } from './database.js'

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE SCHEMA IF NOT EXISTS bolt_bucket
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS bolt_bucket.cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        exterior VARCHAR(60) NOT NULL,
        wheels VARCHAR(60) NOT NULL,
        interior VARCHAR(60) NOT NULL,
        roof VARCHAR(60) NOT NULL,
        convertible BOOLEAN NOT NULL DEFAULT FALSE,
        price INTEGER NOT NULL CHECK (price >= 0),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log('Bolt Bucket database connected!')
    console.log('Schema: bolt_bucket')
    console.log('Table: cars')
    console.log('Database initialized successfully.')

    const result = await pool.query(
      'SELECT COUNT(*) FROM bolt_bucket.cars'
    )

    console.log(
      'Saved cars:',
      result.rows[0].count
    )

  } catch (error) {
    console.error(
      'Database setup failed:',
      error.message
    )

    process.exitCode = 1

  } finally {
    await pool.end()
  }
}

initializeDatabase()