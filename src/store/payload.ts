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
import { useStockStore } from './stock';
import { _StoreWithState } from 'pinia';

export type StoreStates = keyof Omit<
  ReturnType<typeof useStockStore>,
  "request" | "fetchStock" | "states" | keyof _StoreWithState<"stock", any, any, any>
>


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
// const getRecommendCodes = () => createAsyncPayload('')

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


type RequestOptionsType = {
  state: StoreStates,
  url: (code: string) => string,
  callback?: (response: AxiosResponse) => StateType
}

const requestOptions: RequestOptionsType[] = [
  {
    state: 'stock',
    url: getStockUrl
  },
  {
    state: 'news',
    url: getStockNewsUrl
  },
  {
    state: 'stockGraphAll',
    url: getStockGraphAllUrl,
    callback: (response: AxiosResponse<IStockGraphResponse>) => response.data.origin
  },
  {
    state: 'stockEvaluationDaily',
    url: getStockEvaluationDailyUrl
  }
]

const payloads = (code: string) => requestOptions.map(request => createAsyncPayload(request.state, request.url(code), request.callback))


export const stockPayloads = [
  getStockNews,
  getStock,
  getStockEvaluation,
  getStockGraphAll,
  getStockIndicator,
  getStockIndicatorSector,
  getStockIndicatorDaily,
  getStockIndicatorSectorDaily,
  getStockVolume,
  getStockSimilarContents,
  getStockEvaluationDaily,
  getStockStatement,
]

export {
  getStock,
  getStockEvaluation,
  getTodayMarket,
  getMarketValuation,
  getRank,
  getStockGraphAll,
  getSearchTable,
  payloads
}