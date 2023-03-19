import { ChipType } from "@/components/detail/indicator/IndicatorChip"

/** 
 * @param type 변경할 문자열
 * @return 파스칼 케이스로 변경된 문자열
 * @description 문자열을 파스칼 케이스로 변경합니다.
 */
export const toPascalCase = (type: string): string => type.replace(/(^\w|_\w)/g, text => text.replace(/_/, '').toUpperCase())

export const getTrend = (datas: number[]): ChipType => datas[0] > datas[3] ? '하락' : '상승'

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



