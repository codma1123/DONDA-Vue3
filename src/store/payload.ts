import { 
  getRankUrl,
  getSearchTableUrl,
  getStockEvaluationDailyUrl,
  getStockEvaluationUrl,
  getStockGraphAllUrl,
  getStockIndicatorDailyUrl,
  getStockIndicatorSectorDailyUrl,
  getStockIndicatorSectorUrl,
  getStockIndicatorUrl,
  getStockNewsUrl,
  getStockSimilarContentsUrl,
  getStockVolumeUrl,
  getMarketValuationUrl,
  getStockUrl,
  getTodayMarketUrl,
  getStockStatementUrl,
  getStockStatementAllUrl
} from '@/api/api';

import { AxiosResponse } from "axios"
import { IStockGraphResponse, ResponseType, StatementType } from "@/api/types"
import { 
  rankParser, 
  todayMarketParser, 
  indicatorParser,
  indicatorDailyParser,
  indicatorSectorDailyParser,
  statementParser
} from "@/store/callbacks"
import { StateType } from '@/models/stock';

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
'similarContents' |
'statement' | 
'stockDonda' | 
StatementType






export type AsyncPayload = {
  state: StoreStates,
  url: string
  callback: (response: AxiosResponse<ResponseType>) => StateType
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
const getStockEvaluationDaily = (code: string) => createAsyncPayload('stockEvaluationDaily', getStockEvaluationDailyUrl(code))
const getStockGraphAll = (code: string) => createAsyncPayload('stockGraphAll', getStockGraphAllUrl(code), (response: AxiosResponse<IStockGraphResponse>) => response.data.origin)
const getStockNews = (code: string) => createAsyncPayload('news', getStockNewsUrl(code))
const getStockIndicator = (code: string) => createAsyncPayload('indicator', getStockIndicatorUrl(code), indicatorParser)
const getStockIndicatorDaily = (code: string) => createAsyncPayload('indicatorDaily', getStockIndicatorDailyUrl(code), indicatorDailyParser)
const getStockIndicatorSector = (code: string) => createAsyncPayload('indicatorSector', getStockIndicatorSectorUrl(code))
const getStockIndicatorSectorDaily = (code: string) => createAsyncPayload('indicatorSectorDaily', getStockIndicatorSectorDailyUrl(code), indicatorSectorDailyParser)
const getStockVolume = (code: string) => createAsyncPayload('stockVolume', getStockVolumeUrl(code), (response: AxiosResponse<IStockGraphResponse>) => response.data.origin)
const getStockSimilarContents = (code: string) => createAsyncPayload('similarContents', getStockSimilarContentsUrl(code))

const getStockStatement = (code: string) => createAsyncPayload('statement', getStockStatementUrl(code), statementParser)
// const getStockStatmentAll = (code: string, statementType: StatementType) => createAsyncPayload(statementType, getStockStatementAllUrl(code, statementType))



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
  getStockSimilarContents,
  getStockEvaluationDaily,
  getStockStatement
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