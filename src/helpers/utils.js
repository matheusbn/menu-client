export const isHttp = url => /^http/.test(url)

export const capitalize = str => str[0].toUpperCase() + str.slice(1)

export const isFunction = obj => {
  if (!obj) return
  obj.constructor.name === 'Function'
}

export const formatMoney = value =>
  new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)

export const createKeyGenerator = () => {
  let key = 0
  return () => key++
}
