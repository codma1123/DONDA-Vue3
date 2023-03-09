export const priceFormatter = new Intl.NumberFormat('ko-KR', { 
  style: 'currency', 
  currency: 'KRW',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
})

export const priceCompactFormatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency', 
  currency: 'KRW',
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
  notation: 'compact', 
})

export const getKeyByValue = (obj: any, value: string) => Object.keys(obj).find(key => obj[key] === value)

export const delayFunc = (delay: number = 1000) => {
  type EffectType = () => void
  return (effect: EffectType) => {
    return new Promise<void>(() => {
      setTimeout(() => {
        effect()
      }, delay)
    })
  }
}


