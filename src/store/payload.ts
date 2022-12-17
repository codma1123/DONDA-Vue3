import { getRankUrl, getSearchTableUrl, getStockEvaluationUrl, getStockGraphAllUrl, getStockIndicatorDailyUrl, getStockIndicatorSectorDailyUrl, getStockIndicatorSectorUrl, getStockIndicatorUrl, getStockNewsUrl, getStockSimilarContentsUrl, getStockVolumeUrl } from './../api/api';
import { AxiosResponse } from "axios"
import { getMarketValuationUrl, getStockUrl, getTodayMarketUrl } from "../api/api"
import { IStockGraphResponse, ResponseType, } from "../api/types"
import { rankParser, todayMarketParser, indicatorParser, indicatorDailyParser, indicatorSectorDailyParser } from "./callbacks"

export type StoreStates = 
'stock' | 
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
'rank' |
'searchTable' |
'stockVolume' |
'similarContents'


export type AsyncPayload = {
  state: StoreStates,
  url: string
  callback: (response: AxiosResponse<ResponseType>) => any
}

const createAsyncPayload = (state: StoreStates, url: string, callback?: any): AsyncPayload => ({
  state,
  url,
  callback: callback || (response => response.data)
})

const getTodayMarket = () => createAsyncPayload('market', getTodayMarketUrl(), todayMarketParser)
const getMarketValuation = () => createAsyncPayload('marketValuation', getMarketValuationUrl())
const getRank = () => createAsyncPayload('rank', getRankUrl(), rankParser)
const getSearchTable = () => createAsyncPayload('searchTable', getSearchTableUrl())

const getStock = (code: string) => createAsyncPayload('stock', getStockUrl(code))
const getStockEvaluation = (code: string) => createAsyncPayload('stockEvaluation', getStockEvaluationUrl(code))
const getStockGraphAll = (code: string) => createAsyncPayload('stockGraphAll', getStockGraphAllUrl(code), (response: AxiosResponse<IStockGraphResponse>) => response.data.origin)
const getStockNews = (code: string) => createAsyncPayload('news', getStockNewsUrl(code))
const getStockIndicator = (code: string) => createAsyncPayload('indicator', getStockIndicatorUrl(code), indicatorParser)
const getStockIndicatorDaily = (code: string) => createAsyncPayload('indicatorDaily', getStockIndicatorDailyUrl(code), indicatorDailyParser)
const getStockIndicatorSector = (code: string) => createAsyncPayload('indicatorSector', getStockIndicatorSectorUrl(code))
const getStockIndicatorSectorDaily = (code: string) => createAsyncPayload('indicatorSectorDaily', getStockIndicatorSectorDailyUrl(code), indicatorSectorDailyParser)
const getStockVolume = (code: string) => createAsyncPayload('stockVolume', getStockVolumeUrl(code), (response: AxiosResponse<IStockGraphResponse>) => response.data.origin)
const getStockSimilarContents = (code: string) => createAsyncPayload('similarContents', getStockSimilarContentsUrl(code))


export const stockPayloads = [
  getStock,
  getStockEvaluation,
  getStockGraphAll,
  getStockNews,
  getStockIndicator,
  getStockIndicatorSector,
  getStockIndicatorDaily,
  getStockIndicatorSectorDaily,
  getStockVolume,
  getStockSimilarContents
]

export {
  getStock,
  getStockEvaluation,
  getTodayMarket,
  getMarketValuation,
  getRank,
  getStockGraphAll,
  getSearchTable
}