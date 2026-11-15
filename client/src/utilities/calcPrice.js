export const BASE_PRICE = 42000

export const optionPrices = {
  exterior: {
    'Midnight Black': 0,
    'Racing Red': 1200,
    'Arctic White': 800,
    'Electric Blue': 1400
  },
  wheels: { Street: 0, Sport: 1800, Track: 3200 },
  interior: { Cloth: 0, Leather: 2200, Alcantara: 3800 },
  roof: { Standard: 0, Panoramic: 1600, 'Carbon Fiber': 4200 },
  convertible: 7500
}

export const calculatePrice = (car) =>
  BASE_PRICE +
  optionPrices.exterior[car.exterior] +
  optionPrices.wheels[car.wheels] +
  optionPrices.interior[car.interior] +
  optionPrices.roof[car.roof] +
  (car.convertible ? optionPrices.convertible : 0)

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price)
