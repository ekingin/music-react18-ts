import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getBanners,
  getHotRecommends,
  getNewAlbums,
  getPlaylistDetail,
} from '@/service/modules/discover/recommend'

interface IState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
  toplists: any[]
}

const initialState: IState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  toplists: [],
}

const recommendSlice = createSlice({
  name: 'commmend',
  initialState,
  reducers: {
    changeBanners(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommends(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbums(state, { payload }) {
      state.newAlbums = payload
    },
    changeToplists(state, { payload }) {
      state.toplists = payload
    },
  },
})

export const fecthRecommendDataAction = createAsyncThunk(
  'fetchRecommendData',
  (arg, { dispatch }) => {
    getBanners().then((res) => {
      dispatch(changeBanners(res.banners))
    })
    getHotRecommends(8).then((res) => {
      dispatch(changeHotRecommends(res.result))
    })
    getNewAlbums().then((res) => {
      dispatch(changeNewAlbums(res.albums))
    })
  },
)

export const fetchRankingDataAction = createAsyncThunk('fetchRankingData', (arg, { dispatch }) => {
  const rankingIds = [19723756, 3779629, 2884035]
  const promises: Promise<any>[] = []
  for (const id of rankingIds) {
    promises.push(getPlaylistDetail(id))
  }
  Promise.all(promises).then((res) => {
    const toplists = res.map((item) => item.playlist)
    dispatch(changeToplists(toplists))
  })
})

export const { changeBanners, changeHotRecommends, changeNewAlbums, changeToplists } =
  recommendSlice.actions
export default recommendSlice.reducer
