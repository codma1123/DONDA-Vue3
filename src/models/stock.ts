import { 
  IStockResponse, 
  IStockEvaluationResponse, 
  IStockEvaluationDailyResponse, 
  IStockSimilarResponse,
  IStockNewsResponse,
  IStockIndicatorSectorResponse,
  MarketValuationResponse, RankResponse, SearchTableResponse, StockStatementElement 
} from "../api/types"

export type MarketTypes = 'kospi' | 'nasdaq' | 'usdkrw' | 'snp500' | 'us1yt' | 'us5yt' | 'us10yt' | 'usdkrw'

export interface IStockIndicatorDailyModel {
  [indicatorType: string]: number[]
}

export interface IStockEvaluationModel {
  date: string[],
  value: string[]
}


export interface INewsModel {
  subject: string | undefined
  summary: string | undefined
  url: string | undefined
}

interface ISimpleStock {
  [key: string]: number
}

interface ISectorDaily {
  [indicatorType: string]: number[]
}

interface IDateValue {
  [type: string]: {
    date: string[] 
    value: number[]
  }  
}

/// new 
export type StockType = IStockResponse
export type VolumeType = ISimpleStock
export type GraphDefaultType = ISimpleStock
export type GraphAllType = ISimpleStock
export type EvaluationType = IStockEvaluationResponse
export type EvaluationDailyType = IStockEvaluationDailyResponse
export type SimilarType = IStockSimilarResponse[]
export type NewsType = IStockNewsResponse

export type StatementType = {
  date: string[],
  data: StockStatementElement[]
}
export type StatementAllType = ISimpleStock
export type IndicatorType = IDateValue
export type IndicatorSectorType = IStockIndicatorSectorResponse
export type IndicatorDailyType = IDateValue
export type IndicatorSectorDailyType = IDateValue  
export type DondaType = IStockEvaluationDailyResponse
export type StocksType = IStockResponse[]

export type MarketType = {
	[marketType in MarketTypes]: MarketValues
}

export type MarketValues = {
  labels: string[]
  values: {
    type: MarketTypes
    open: number
    close: number
    high: number
    low: number
    changes: number
    volume: number
  }[]
}

export type MarketValuationType = MarketValuationResponse

export type RankContent = {
  code: string,
  title: string,
  market: string,
  close: string,
  change: string,
  changeRatio: number,
  volume: BigInt,
  marcap: BigInt,
  prefix: string,
}

export type RankType = Record<keyof RankResponse, RankContent[]>

export type MarketRecentType = {
	[marketType in MarketTypes]: {
		close?: number
		changes?: number
		recent?: string
	}
}

export interface CodeTitleMappingType {
	[title: string]: string
}

export type SearchTableType = SearchTableResponse

export type StateType = 
  RankType |
  StockType |
  VolumeType |
  GraphDefaultType |
  GraphAllType |
  EvaluationType |
  EvaluationDailyType |
  SimilarType |
  NewsType[] |
  StatementType |
  StatementAllType |
  IndicatorType |
  IndicatorSectorType |
  IndicatorDailyType |
  IndicatorSectorDailyType |
  DondaType |
  StocksType |

  MarketType |
  MarketValuationType |
  MarketRecentType |
  CodeTitleMappingType


