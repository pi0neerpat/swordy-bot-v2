export const truncate = (text, length = 50) => {
  if (typeof text !== 'string') return ''
  return text.substring(0, length) + (text.length > length ? '...' : '')
}

export const trimAddress = (address) => {
  if (typeof address !== 'string') return ''
  return address.substring(0, 5) + '...' + address.substring(38, 42)
}
