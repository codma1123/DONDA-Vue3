import { getRankUrl, getStockEvaluationUrl, getStockGraphAllUrl, getStockIndicatorDailyUrl, getStockIndicatorSectorUrl, getStockIndicatorUrl, getStockNewsUrl } from './../api/api';
import { AxiosResponse } from "axios"
import { getMarketValuationUrl, getStockUrl, getTodayMarketUrl } from "../api/api"
import { IStockGraphResponse, ResponseType, } from "../api/types"
import { rankParser, todayMarketParser, indicatorParser, indicatorDailyParser } from "./callbacks"

export type StoreStates = 
'stock' | 
'stockGraphVolume' | 
'stockGraphDefault' |
'stockGraphAll' | 
'stockEvaluation' | 
'stockEvaluationDaily' | 
'similarContents' | 
'news' | 
'statement' | 
'statementAll' | 
'indicator' | 
'indicatorSector' | 
'indicatorDaily' | 
'indicatorSectorDaily' | 
'stockDonda' | 
'recommendStocks' | 
'recommendStockCodes' |
'market' |
'marketValuation' | 
'rank'


export type AsnyPayload = {
  state: StoreStates,
  url: string
  callback: (response: AxiosResponse<ResponseType>) => any
}

const createAsyncPayload = (state: StoreStates, url: string, callback?: any): AsnyPayload => ({
  state,
  url,
  callback: callback || (response => response.data)
})

const getTodayMarket = () => createAsyncPayload('market', getTodayMarketUrl(), todayMarketParser)
const getMarketValuation = () => createAsyncPayload('marketValuation', getMarketValuationUrl())
const getRank = () => createAsyncPayload('rank', getRankUrl(), rankParser)

const getStock = (code: string) => createAsyncPayload('stock', getStockUrl(code))
const getStockEvaluation = (code: string) => createAsyncPayload('stockEvaluation', getStockEvaluationUrl(code))
const getStockGraphAll = (code: string) => createAsyncPayload('stockGraphAll', getStockGraphAllUrl(code), (response: AxiosResponse<IStockGraphResponse>) => response.data.origin)
const getStockNews = (code: string) => createAsyncPayload('news', getStockNewsUrl(code))
const getStockIndicator = (code: string) => createAsyncPayload('indicator', getStockIndicatorUrl(code), indicatorParser)
const getStockIndicatorDaily = (code: string) => createAsyncPayload('indicatorDaily', getStockIndicatorDailyUrl(code), indicatorDailyParser)
const getStockIndicaotrSector = (code: string) => createAsyncPayload('indicatorSector', getStockIndicatorSectorUrl(code))

export const stockPayloads = [
  getStock,
  getStockEvaluation,
  getStockGraphAll,
  getStockNews,
  getStockIndicator,
  getStockIndicaotrSector,
  getStockIndicatorDaily
]

export {
  getStock,
  getStockEvaluation,
  getTodayMarket,
  getMarketValuation,
  getRank,
  getStockGraphAll
}