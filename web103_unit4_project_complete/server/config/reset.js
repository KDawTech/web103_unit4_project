import 'dotenv/config'
import { pool } from './database.js'

const resetDatabase = async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS cars')
    await pool.query(`
      CREATE TABLE cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        exterior VARCHAR(60) NOT NULL,
        wheels VARCHAR(60) NOT NULL,
        interior VARCHAR(60) NOT NULL,
        roof VARCHAR(60) NOT NULL,
        convertible BOOLEAN NOT NULL DEFAULT FALSE,
        price INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await pool.query(
      `INSERT INTO cars (name, exterior, wheels, interior, roof, convertible, price)
       VALUES ($1,$2,$3,$4,$5,$6,$7), ($8,$9,$10,$11,$12,$13,$14)`,
      [
        'Midnight Runner', 'Midnight Black', 'Sport', 'Leather', 'Carbon Fiber', false, 50200,
        'Crimson GT', 'Racing Red', 'Track', 'Alcantara', 'Standard', true, 57800
      ]
    )

    console.log('cars table reset and seeded successfully')
  } catch (error) {
    console.error('reset failed:', error.message)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

resetDatabase()
