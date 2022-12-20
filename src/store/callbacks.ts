import { AxiosResponse } from "axios"
import { MarketResponse, RankResponse, IStockIndicatorResponse, IStockIndicatorDailyResponse, IStockIndicatorSectorDailyResponse, IStockStatementResponse } from "../api/types"
import { priceFormatter } from "../mixins/tools"
import { IndicatorType, StatementType } from "../models/stock"

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

export const rankParser = (response: AxiosResponse<RankResponse>) => {
  const rank = response.data
  const rankTypes = Object.keys(response.data) as (keyof RankResponse)[]
  const obj: { [rankType: string]: any } = {}

  return rankTypes.reduce((acc, cur) => {
    const rankEntries = rank[cur]

    acc[cur] = rankEntries.map(entry => ({
      code: entry[1], 
      title: entry[2], 
      market: entry[3], 
      close: priceFormatter.format(entry[4] as number),
      change: (entry[5] as number).toLocaleString(), 
      changeRatio: entry[6],
      volume: entry[10],
      marcap: entry[12],
      prefix: (entry[5] as number) > 0 ? '+' : ''
    }))

    return obj
  }, obj)  
}

export const indicatorParser = (response: AxiosResponse<IStockIndicatorResponse>): IndicatorType => {
  const date = Object.keys(response.data)
  const values = Object.values(response.data)

  return {
    eps: { date, value: values.map(v => v[0].eps) },
    bps: { date, value: values.map(v => v[0].bps) },
    roe: { date, value: values.map(v => v[0].roe) },    
  }  
}

export const indicatorDailyParser = (response: AxiosResponse<IStockIndicatorDailyResponse>): IndicatorType => {
  const date = Object.keys(response.data)
  const values = Object.values(response.data)

  return {
    per: { date, value: values.map(v => v[0].PER) },
    pbr: { date, value: values.map(v => v[0].PBR) },
    psr: { date, value: values.map(v => v[0].PSR) },    
  }  
}

export const indicatorSectorDailyParser = (response: AxiosResponse<IStockIndicatorSectorDailyResponse>): IndicatorType => {
  const date = Object.keys(response.data)
  const values = Object.values(response.data)


  return {
    per: { date, value: values.map(v => v[0].per) },
    pbr: { date, value: values.map(v => v[0].pbr) },
    psr: { date, value: values.map(v => v[0].psr) }
  }
}

export const statementParser = (response: AxiosResponse<IStockStatementResponse>): StatementType => {
  const date = Object.keys(response.data)
  return {
    date,
    data: date.map(key => response.data[key][0])
  }
}