import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IRecommendState } from '@/store/types'
import { getBanners } from '@/service/modules/discover/recommend'

const initialState: IRecommendState = {
  banners: []
}

const recommendSlice = createSlice({
  name: 'commmend',
  initialState,
  reducers: {
    changeBanners(state, { payload }) {
      state.banners = payload
    }
  }
})

export const fecthRecommendBanners = createAsyncThunk('recommend', async (arg, { dispatch }) => {
  const res = await getBanners()
  dispatch(changeBanners(res.banners))
})

export const { changeBanners } = recommendSlice.actions
export default recommendSlice.reducer
