import { pool } from '../config/database.js'

const getCars = async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars ORDER BY id DESC')
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCarById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars WHERE id=$1', [Number(req.params.id)])
    if (!result.rows[0]) return res.status(404).json({ error: 'Car not found' })
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const validateCombination = ({ roof, convertible }) => {
  if (convertible && roof === 'Panoramic') {
    return 'A convertible cannot use the Panoramic roof. Choose Standard or Carbon Fiber.'
  }
  return null
}

const createCar = async (req, res) => {
  try {
    const { name, exterior, wheels, interior, roof, convertible, price } = req.body
    const comboError = validateCombination({ roof, convertible })
    if (comboError) return res.status(400).json({ error: comboError })

    const result = await pool.query(
      `INSERT INTO cars (name, exterior, wheels, interior, roof, convertible, price)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [name, exterior, wheels, interior, roof, Boolean(convertible), Number(price)]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const updateCar = async (req, res) => {
  try {
    const { name, exterior, wheels, interior, roof, convertible, price } = req.body
    const comboError = validateCombination({ roof, convertible })
    if (comboError) return res.status(400).json({ error: comboError })

    const result = await pool.query(
      `UPDATE cars
       SET name=$1, exterior=$2, wheels=$3, interior=$4, roof=$5, convertible=$6, price=$7
       WHERE id=$8
       RETURNING *`,
      [name, exterior, wheels, interior, roof, Boolean(convertible), Number(price), Number(req.params.id)]
    )
    if (!result.rows[0]) return res.status(404).json({ error: 'Car not found' })
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const deleteCar = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM cars WHERE id=$1 RETURNING *', [Number(req.params.id)])
    if (!result.rows[0]) return res.status(404).json({ error: 'Car not found' })
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default { getCars, getCarById, createCar, updateCar, deleteCar }
