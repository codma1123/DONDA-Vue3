import { AxiosResponse } from "axios"
import { MarketResponse } from "../api/types"

export type MarketTypes = 'KOSPI' | 'NASDAQ' | 'S&P500' | 'US1YT' | 'US5YT' | 'US10YT' | 'USD/KRW'

const marketMapping = {
	'KOSPI': 'kospi',
	'NASDAQ': 'nasdaq',
	'S&P500': 'snp500',
	'US1YT': 'us1yt',
	'US5YT': 'us5yt',
	'US10YT': 'us10yt',
	'USD/KRW': 'usdkrw'
}

export const todayMarketParser = (response: AxiosResponse<MarketResponse>) => {
  const marketDefault: {
    [marketType: string]: {
      labels: string[],
      values: (string | number)[]
    }
  } = {
    kospi: { labels: [], values: [] },
    nasdaq: { labels: [], values: [] },
    snp500: { labels: [], values: [] },
    us1yt: { labels: [], values: [] },
    us5yt: { labels: [], values: [] },
    us10yt: { labels: [], values: [] },
    usdkrw: { labels: [], values: [] }
  }

  return Object.entries(response.data).reduce((acc, entry: [string, any]) => {
    const types = ((entry[1] as (string | number)[]).map(v => Object.keys(v)[0]))          
    const index = entry[1].map((s: { [s: string]: unknown } | ArrayLike<unknown>) => Object.entries(s)[0])
    types.forEach(type => {
      const mappingType = marketMapping[type as MarketTypes]				
      acc[mappingType].labels.push(entry[0]) 
      acc[mappingType].values.push(index.find((entry: string[]) => entry[0] === type)[1])
    })
    return acc          
  }, marketDefault)
}