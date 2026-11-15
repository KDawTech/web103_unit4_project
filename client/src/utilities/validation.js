export const validateCar = (car) => {
  if (!car.name.trim()) return 'Give your custom car a name.'

  if (car.convertible && car.roof === 'Panoramic') {
    return 'Impossible combination: a convertible cannot use the Panoramic roof.'
  }

  return ''
}
