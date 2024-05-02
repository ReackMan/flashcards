import { Sort } from '@/components'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type PaginationOptions = { title: string; value: string }[]

const initialState = {
  currentPage: 1,
  pageSize: 10,
  paginationOptions: [
    { title: '5', value: '5' },
    { title: '10', value: '10' },
    { title: '15', value: '15' },
  ] as PaginationOptions,
  question: '',
  sortParams: null as Sort,
}

export const cardsSlice = createSlice({
  initialState,
  name: 'cards',
  reducers: {
    setCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
      state.currentPage = action.payload.currentPage
    },
    setInitialState: () => initialState,
    setPageSize: (state, action: PayloadAction<{ pageSize: number }>) => {
      state.pageSize = action.payload.pageSize
    },
    setSearchByQuestion: (state, action: PayloadAction<{ searchQuestion: string }>) => {
      state.question = action.payload.searchQuestion
    },
    setSortOrderBy: (state, action: PayloadAction<{ sortParams: Sort }>) => {
      state.sortParams = action.payload.sortParams
    },
  },
})

export const cardsActions = cardsSlice.actions
