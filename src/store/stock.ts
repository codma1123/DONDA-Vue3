import { MarketType, MarketValuationType, RankType, SearchTableType } from './../models/stock';
import axios from 'axios';
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { DondaType, EvaluationDailyType, EvaluationType, GraphAllType, GraphDefaultType, IndicatorDailyType, IndicatorSectorDailyType, IndicatorSectorType, IndicatorType, NewsType, SimilarType, StatementAllType, StatementType, StateType, StocksType, StockType, VolumeType } from "../models/stock";
import { AsyncPayload, stockPayloads } from './payload';
import { ResponseType } from '@/api/types';

export type AsyncState<T = StateType, E = unknown> = {
  loading: boolean
  data: T
  error: E | unknown
}

const utils = {
  initial: <T extends StateType = any, E = unknown>(initialData?: any): AsyncState<T, E> => ({
    loading: true,
    data: initialData ?? null,
    error: null
  })
}

const CancleToken = axios.CancelToken
const source = CancleToken.source()

export const useStockStore = defineStore('stock', () => {

  const store = useStockStore()

  const initialState = utils.initial()

  // STATES
  const currentStock = ref<string>('')
  const market = reactive<AsyncState<MarketType>>(initialState)
  const marketValuation = reactive<AsyncState<MarketValuationType>>(initialState)
  const rank = reactive<AsyncState<RankType>>(initialState)
  const searchTable = reactive<AsyncState<SearchTableType>>(initialState)
  const stock = reactive<AsyncState<StockType>>(initialState)
  const stockGraphDefault = reactive<AsyncState<GraphDefaultType>>(initialState)
  const stockVolume = reactive<AsyncState<VolumeType>>(initialState)
  const stockGraphAll = reactive<AsyncState<GraphAllType>>(initialState)
  const stockEvaluation = reactive<AsyncState<EvaluationType>>(initialState)
  const stockEvaluationDaily = reactive<AsyncState<EvaluationDailyType>>(initialState)
  const similarContents = reactive<AsyncState<SimilarType>>(initialState)
  const news = reactive<AsyncState<NewsType[]>>(initialState)
  const statement = reactive<AsyncState<StatementType>>(initialState)
  const statementAll = reactive<AsyncState<StatementAllType>>(initialState)
  const indicator = reactive<AsyncState<IndicatorType>>(initialState)
  const indicatorSector = reactive<AsyncState<IndicatorSectorType>>(initialState)
  const indicatorDaily = reactive<AsyncState<IndicatorDailyType>>(initialState)
  const indicatorSectorDaily = reactive<AsyncState<IndicatorSectorDailyType>>(initialState)
  const stockDonda = reactive<AsyncState<DondaType>>(initialState)
  const recommendStocks = reactive<AsyncState<StocksType>>(initialState)
  const recommendStockCodes = reactive<AsyncState<any>>(initialState)

    
  const request = async (payload: AsyncPayload): Promise<void> => {    

    const { state, url, callback } = payload

    const targetState: AsyncState = (store as any)[state]
    targetState.loading = true
    
    try {
      const response = await axios.get<ResponseType>(url, { cancelToken: source.token })
      
      targetState.data = callback(response)
      targetState.loading = false

    } catch (error: unknown) {

      targetState.error = error
      targetState.loading = false
    } 
  }

  const stockRequests = (code: string): void => stockPayloads.forEach(payload => store.request(payload(code)))
  
    
  return {
    request,
    stockRequests,

    stock,
    stockGraphDefault,
    stockGraphAll,
    stockEvaluation,
    stockEvaluationDaily,
    similarContents,
    news,
    statement,
    statementAll,
    indicator,
    indicatorSector,
    indicatorDaily,
    indicatorSectorDaily,
    stockDonda,
    recommendStocks,
    recommendStockCodes,
    stockVolume,

    rank,
    market,
    marketValuation,
    searchTable,

    currentStock
  }
})