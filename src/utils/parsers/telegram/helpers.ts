export const serializeAnecdoteMessage = (message: string) => {
  return message.replace(/[\n-]/g, '')
}

export const isAdvertisement = (message: string) => {
  const advertisementSigns = ['t.me', 'https://', 'http://']
  let isAdvertisement = false
  advertisementSigns.forEach((sign) => {
    if (isAdvertisement) return
    if (message.includes(sign)) {
      isAdvertisement = true
    }
  })
  return isAdvertisement
}
