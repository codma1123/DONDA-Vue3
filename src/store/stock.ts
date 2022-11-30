import axios from 'axios';
import { defineStore } from "pinia";
import { computed, reactive, readonly, ref } from "vue";
import { getStockUrl } from '../api/api';
import { StockType } from "../models/stock";

type State<T> = {
  loading: boolean
  data: T | {}
  error: any
}

const utils = {
  initial: <T = any>(initialData?: any): State<T> => ({
    loading: false,
    data: initialData,
    error: null
  })
}

export const useStockStore = defineStore('stock', () => {
  const test = ref<string>('test')
  const computedTest = computed<string>(() => 'computedTest')

  const stock = reactive<State<StockType>>(utils.initial())
  

  const actionTest = (arg: string) => {
      test.value = arg
  }

  const requestTest = async (): Promise<any> => {
    stock.loading = true

    try {
      const res = await axios.get(getStockUrl('005930'))      
      stock.data = res.data
      stock.loading = false
    } catch (e) {
      stock.error = e
      stock.loading = false
    }
    
  }

  return {
    test,
    stock,
    computedTest,
    actionTest,
    requestTest
  }
})