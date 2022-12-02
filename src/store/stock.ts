import { MarketType, MarketValuationType, RankType } from './../models/stock';
import axios from 'axios';
import { defineStore } from "pinia";
import { reactive } from "vue";
import { DondaType, EvaluationDailyType, EvaluationType, GraphAllType, GraphDefaultType, IndicatorDailyType, IndicatorSectorDailyType, IndicatorSectorType, IndicatorType, NewsType, SimilarType, StatementAllType, StatementType, StateType, StocksType, StockType, VolumeType } from "../models/stock";
import { AsnyPayload } from './payload';

export type AsyncState<T extends StateType = any> = {
  loading: boolean
  data: T
  error: any
}

const utils = {
  initial: <T extends StateType>(initialData?: any): AsyncState<T> => ({
    loading: false,
    data: initialData ?? null,
    error: null
  })
}

export const useStockStore = defineStore('stock', () => {

  const store = useStockStore()

  const market = reactive<AsyncState<MarketType>>(utils.initial())
  const marketValuation = reactive<AsyncState<MarketValuationType>>(utils.initial())
  const rank = reactive<AsyncState<RankType>>(utils.initial())

  const stock = reactive<AsyncState<StockType>>(utils.initial())
  const stockGraphVolume = reactive<AsyncState<VolumeType>>(utils.initial())
  const stockGraphDefault = reactive<AsyncState<GraphDefaultType>>(utils.initial())
  const stockGraphAll = reactive<AsyncState<GraphAllType>>(utils.initial())
  const stockEvaluation = reactive<AsyncState<EvaluationType>>(utils.initial())
  const stockEvaluationDaily = reactive<AsyncState<EvaluationDailyType>>(utils.initial())
  const similarContents = reactive<AsyncState<SimilarType>>(utils.initial())
  const news = reactive<AsyncState<NewsType>>(utils.initial())
  const statement = reactive<AsyncState<StatementType>>(utils.initial())
  const statementAll = reactive<AsyncState<StatementAllType>>(utils.initial())
  const indicator = reactive<AsyncState<IndicatorType>>(utils.initial())
  const indicatorSector = reactive<AsyncState<IndicatorSectorType>>(utils.initial())
  const indicatorDaily = reactive<AsyncState<IndicatorDailyType>>(utils.initial())
  const indicatorSectorDaily = reactive<AsyncState<IndicatorSectorDailyType>>(utils.initial())
  const stockDonda = reactive<AsyncState<DondaType>>(utils.initial())
  const recommendStocks = reactive<AsyncState<StocksType>>(utils.initial())
  const recommendStockCodes = reactive<AsyncState<any>>(utils.initial())
  
  const request = async (payload: AsnyPayload): Promise<void> => {    

    const { state, url, callback } = payload    
    const targetState = store[state]

    targetState.loading = true

    try {

      const res = await axios.get(url)         
      targetState.data = callback(res)
      targetState.loading = false
      console.log(state, targetState.data)
      

    } catch (e) {

      targetState.error = e
      targetState.loading = false

    }
    
  }

  return {
    request,

    stock,
    stockGraphVolume,
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

    rank,
    market,
    marketValuation
  }
})