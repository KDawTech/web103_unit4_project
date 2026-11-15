import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteCar, getCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/calcPrice'
import { CarPreview } from './CreateCar'
import '../App.css'

const CarDetails = ({ title }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = title || 'Bolt Bucket | View'
    getCar(id).then(setCar).catch((err) => setError(err.message))
  }, [id, title])

  const remove = async () => {
    if (!window.confirm('Delete this custom car?')) return
    await deleteCar(id)
    navigate('/customcars')
  }

  if (error) {
    return <main className='page-shell'><p className='error-box'>{error}</p></main>
  }

  if (!car) {
    return <main className='page-shell'><p>Loading build...</p></main>
  }

  return (
    <main className='page-shell details-page'>
      <article className='details-card'>
        <CarPreview car={car} />

        <div className='details-content'>
          <p className='eyebrow'>CUSTOM BUILD #{car.id}</p>
          <h1>{car.name}</h1>
          <h2 className='detail-price'>{formatPrice(car.price)}</h2>

          <dl className='spec-list'>
            <div><dt>Exterior</dt><dd>{car.exterior}</dd></div>
            <div><dt>Wheels</dt><dd>{car.wheels}</dd></div>
            <div><dt>Interior</dt><dd>{car.interior}</dd></div>
            <div><dt>Roof</dt><dd>{car.roof}</dd></div>
            <div><dt>Convertible</dt><dd>{car.convertible ? 'Yes' : 'No'}</dd></div>
          </dl>

          <div className='card-actions'>
            <Link to={`/edit/${car.id}`} role='button'>Edit Build</Link>
            <button className='danger' onClick={remove}>Delete</button>
            <Link to='/customcars' className='secondary' role='button'>Back</Link>
          </div>
        </div>
      </article>
    </main>
  )
}

export default CarDetails
