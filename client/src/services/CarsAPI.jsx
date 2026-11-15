const BASE_URL = '/api/cars'

const request = async (url, options) => {
  const response = await fetch(url, options)
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const getAllCars = () => request(BASE_URL)
export const getCar = (id) => request(`${BASE_URL}/${id}`)

export const createCar = (car) => request(BASE_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(car)
})

export const updateCar = (id, car) => request(`${BASE_URL}/${id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(car)
})

export const deleteCar = (id) => request(`${BASE_URL}/${id}`, {
  method: 'DELETE'
})
