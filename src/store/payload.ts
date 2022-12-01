import { AxiosResponse } from "axios"
import { getStockUrl } from "../api/api"
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
'recommendStockCodes'


export type AsnyPayload = {
  state: StoreStates,
  url: string
  callback: (response: AxiosResponse<ResponseType>) => any
}

const createPayload = (state: StoreStates, url: string, callback?: any): AsnyPayload => ({
  state,
  url,
  callback: callback || (response => response.data)
})

const getStock = (code: string): AsnyPayload => createPayload('stock', getStockUrl(code))

export {
  getStock
}