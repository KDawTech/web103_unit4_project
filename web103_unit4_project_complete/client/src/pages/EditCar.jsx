import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteCar, getCar, updateCar } from '../services/CarsAPI'
import { calculatePrice, formatPrice } from '../utilities/calcPrice'
import { validateCar } from '../utilities/validation'
import { CarPreview } from './CreateCar'
import '../App.css'

const EditCar = ({ title }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [error, setError] = useState('')
  const price = useMemo(() => car ? calculatePrice(car) : 0, [car])

  useEffect(() => {
    document.title = title || 'Bolt Bucket | Edit'
    getCar(id).then(setCar).catch((err) => setError(err.message))
  }, [id, title])

  const change = (event) => {
    const { name, value, type, checked } = event.target
    setCar((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const submit = async (event) => {
    event.preventDefault()

    const message = validateCar(car)
    if (message) return setError(message)

    try {
      await updateCar(id, { ...car, price })
      navigate(`/customcars/${id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  const remove = async () => {
    if (!window.confirm('Delete this custom car?')) return
    await deleteCar(id)
    navigate('/customcars')
  }

  if (error && !car) {
    return <main className='page-shell'><p className='error-box'>{error}</p></main>
  }

  if (!car) {
    return <main className='page-shell'><p>Loading build...</p></main>
  }

  return (
    <main className='page-shell customizer-page'>
      <div className='section-heading'>
        <div>
          <p className='eyebrow'>EDIT BUILD</p>
          <h1>{car.name}</h1>
        </div>
      </div>

      <section className='builder-grid'>
        <article className='preview-panel'>
          <CarPreview car={car} />
          <div className='price-strip'>
            <span>Updated total</span>
            <strong>{formatPrice(price)}</strong>
          </div>
        </article>

        <form className='builder-form' onSubmit={submit}>
          <label>
            Car name
            <input name='name' value={car.name} onChange={change} />
          </label>

          <div className='field-grid'>
            <label>
              Exterior
              <select name='exterior' value={car.exterior} onChange={change}>
                <option>Midnight Black</option>
                <option>Racing Red</option>
                <option>Arctic White</option>
                <option>Electric Blue</option>
              </select>
            </label>

            <label>
              Wheels
              <select name='wheels' value={car.wheels} onChange={change}>
                <option>Street</option>
                <option>Sport</option>
                <option>Track</option>
              </select>
            </label>

            <label>
              Interior
              <select name='interior' value={car.interior} onChange={change}>
                <option>Cloth</option>
                <option>Leather</option>
                <option>Alcantara</option>
              </select>
            </label>

            <label>
              Roof
              <select name='roof' value={car.roof} onChange={change}>
                <option>Standard</option>
                <option>Panoramic</option>
                <option>Carbon Fiber</option>
              </select>
            </label>
          </div>

          <label className='check-row'>
            <input
              type='checkbox'
              name='convertible'
              checked={car.convertible}
              onChange={change}
            />
            Convertible package (+$7,500)
          </label>

          {error && <p className='error-box'>{error}</p>}

          <div className='edit-actions'>
            <button type='submit'>Save Changes</button>
            <button type='button' className='danger' onClick={remove}>Delete Build</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default EditCar
