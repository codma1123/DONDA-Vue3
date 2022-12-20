import { MarketType, MarketValuationType, RankType, SearchTableType } from './../models/stock';
import axios from 'axios';
import { defineStore, StoreDefinition } from "pinia";
import { reactive, ref } from "vue";
import { DondaType, EvaluationDailyType, EvaluationType, GraphAllType, GraphDefaultType, IndicatorDailyType, IndicatorSectorDailyType, IndicatorSectorType, IndicatorType, NewsType, SimilarType, StatementAllType, StatementType, StateType, StocksType, StockType, VolumeType } from "../models/stock";
import { AsyncPayload } from './payload';
import { ResponseType } from '@/api/types';

export type AsyncState<T = StateType, E = any> = {
  loading: boolean
  data: T 
  error: E | unknown
}

const utils = {
  initial: <T extends StateType, E = any>(initialData?: any): AsyncState<T, E> => ({
    loading: true,
    data: initialData ?? null,
    error: null
  })
}

export const useStockStore = defineStore('stock', () => {

  const store = useStockStore()

  // STATES
  const currentStock = ref<string>('')

  const market = reactive<AsyncState<MarketType>>(utils.initial())
  const marketValuation = reactive<AsyncState<MarketValuationType>>(utils.initial())
  const rank = reactive<AsyncState<RankType>>(utils.initial())
  const searchTable = reactive<AsyncState<SearchTableType>>(utils.initial())

  const stock = reactive<AsyncState<StockType>>(utils.initial())
  const stockGraphDefault = reactive<AsyncState<GraphDefaultType>>(utils.initial())
  const stockVolume = reactive<AsyncState<VolumeType>>(utils.initial())
  const stockGraphAll = reactive<AsyncState<GraphAllType>>(utils.initial())
  const stockEvaluation = reactive<AsyncState<EvaluationType>>(utils.initial())
  const stockEvaluationDaily = reactive<AsyncState<EvaluationDailyType>>(utils.initial())
  const similarContents = reactive<AsyncState<SimilarType>>(utils.initial())
  const news = reactive<AsyncState<NewsType[]>>(utils.initial())
  const statement = reactive<AsyncState<StatementType>>(utils.initial())
  const statementAll = reactive<AsyncState<StatementAllType>>(utils.initial())
  const indicator = reactive<AsyncState<IndicatorType>>(utils.initial())
  const indicatorSector = reactive<AsyncState<IndicatorSectorType>>(utils.initial())
  const indicatorDaily = reactive<AsyncState<IndicatorDailyType>>(utils.initial())
  const indicatorSectorDaily = reactive<AsyncState<IndicatorSectorDailyType>>(utils.initial())
  const stockDonda = reactive<AsyncState<DondaType>>(utils.initial())
  const recommendStocks = reactive<AsyncState<StocksType>>(utils.initial())
  const recommendStockCodes = reactive<AsyncState<any>>(utils.initial())

  const asset = reactive({})
  

  const request = async (payload: AsyncPayload): Promise<void> => {    

    const { state, url, callback } = payload    

    const targetState: AsyncState = (store as any)[state]
    targetState.loading = true

    try {
      const response = await axios.get<ResponseType>(url)
      
      targetState.data = callback(response)
      targetState.loading = false

    } catch (error: unknown) {

      targetState.error = error
      targetState.loading = false
      
    }
  }

  return {
    request,

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