import { AxiosResponse } from "axios"
import { getMarketValuationUrl, getStockUrl, getTodayMarketUrl } from "../api/api"
import { ResponseType, } from "../api/types"
import { todayMarketParser } from "./callbacks"

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
'marketValuation'


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

const getStock = (code: string) => createAsyncPayload('stock', getStockUrl(code))
const getTodayMarket = () => createAsyncPayload('market', getTodayMarketUrl(), todayMarketParser)
const getMarketValuation = () => createAsyncPayload('marketValuation', getMarketValuationUrl())


export {
  getStock,
  getTodayMarket,
  getMarketValuation
}