import 'dotenv/config'
import pg from 'pg'

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: true
  },

  options: '-c search_path=bolt_bucket'
})