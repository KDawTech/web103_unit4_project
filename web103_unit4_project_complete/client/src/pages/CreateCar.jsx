import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCar } from '../services/CarsAPI'
import { calculatePrice, formatPrice } from '../utilities/calcPrice'
import { validateCar } from '../utilities/validation'
import '../App.css'

const COLORS = {
  'Midnight Black': '#17191f',
  'Racing Red': '#c5162e',
  'Arctic White': '#e9edf2',
  'Electric Blue': '#1477ff'
}

const defaults = {
  name: '',
  exterior: 'Midnight Black',
  wheels: 'Street',
  interior: 'Cloth',
  roof: 'Standard',
  convertible: false
}

const CarPreview = ({ car }) => (
  <div
    className={`car-preview ${car.convertible ? 'is-convertible' : ''}`}
    style={{ '--car-color': COLORS[car.exterior] }}
  >
    <div className={`preview-roof roof-${car.roof.toLowerCase().replace(' ', '-')}`}></div>
    <div className='preview-body'></div>
    <div className={`preview-wheel wheel-one wheel-${car.wheels.toLowerCase()}`}></div>
    <div className={`preview-wheel wheel-two wheel-${car.wheels.toLowerCase()}`}></div>
  </div>
)

const CreateCar = ({ title }) => {
  const navigate = useNavigate()
  const [car, setCar] = useState(defaults)
  const [error, setError] = useState('')
  const price = useMemo(() => calculatePrice(car), [car])

  useEffect(() => {
    document.title = title || 'Bolt Bucket'
  }, [title])

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
      await createCar({ ...car, price })
      navigate('/customcars')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className='page-shell customizer-page'>
      <section className='hero-copy'>
        <p className='eyebrow'>DIY DELIGHT · PROJECT 4</p>
        <h1>Build your dream car.</h1>
        <p>Pick a style for every feature. Your total updates instantly and the preview reacts to your choices.</p>
      </section>

      <section className='builder-grid'>
        <article className='preview-panel'>
          <CarPreview car={car} />
          <div className='price-strip'>
            <span>Build total</span>
            <strong>{formatPrice(price)}</strong>
          </div>
          <p className='preview-caption'>
            {car.exterior} · {car.wheels} wheels · {car.interior} interior · {car.roof} roof
          </p>
        </article>

        <form className='builder-form' onSubmit={submit}>
          <label>
            Car name
            <input name='name' value={car.name} onChange={change} placeholder='e.g. Queens Night Runner' />
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

          <button type='submit'>Create Custom Car</button>
        </form>
      </section>
    </main>
  )
}

export { CarPreview, COLORS }
export default CreateCar
