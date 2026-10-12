import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCars } from '../services/CarsAPI'
import { formatPrice } from '../utilities/calcPrice'
import { CarPreview } from './CreateCar'
import '../App.css'

const ViewCars = ({ title }) => {
  const [cars, setCars] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = title || 'Bolt Bucket | Custom Cars'
    getAllCars().then(setCars).catch((err) => setError(err.message))
  }, [title])

  return (
    <main className='page-shell list-page'>
      <div className='section-heading'>
        <div>
          <p className='eyebrow'>YOUR GARAGE</p>
          <h1>Custom builds</h1>
        </div>
        <Link to='/' role='button'>+ New Build</Link>
      </div>

      {error && <p className='error-box'>{error}</p>}

      {!error && cars.length === 0 && (
        <article className='empty-state'>
          <h2>No cars yet.</h2>
          <p>Create your first custom build.</p>
          <Link to='/' role='button'>Customize a car</Link>
        </article>
      )}

      <section className='car-grid'>
        {cars.map((car) => (
          <article className='car-card' key={car.id}>
            <CarPreview car={car} />
            <div className='car-card-body'>
              <h2>{car.name}</h2>
              <strong className='card-price'>{formatPrice(car.price)}</strong>
              <p>{car.exterior} · {car.wheels} · {car.interior}</p>
              <div className='card-actions'>
                <Link to={`/customcars/${car.id}`} role='button'>Details</Link>
                <Link to={`/edit/${car.id}`} className='secondary' role='button'>Edit</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default ViewCars
