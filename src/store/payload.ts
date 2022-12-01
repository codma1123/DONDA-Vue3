import { AxiosResponse } from "axios"
import { getStockUrl, getTodayMarketUrl } from "../api/api"
import { ResponseType, } from "../api/types"

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
'market'


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
const getTodayMarket = (code: string) =>createAsyncPayload('market', getTodayMarketUrl())

export {
  getStock
}