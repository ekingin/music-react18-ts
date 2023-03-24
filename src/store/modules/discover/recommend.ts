import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getArtistList,
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
  artists: any[]
}

const initialState: IState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  toplists: [],
  artists: [],
}

const recommendSlice = createSlice({
  name: 'commmend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendsAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumsAction(state, { payload }) {
      state.newAlbums = payload
    },
    changeToplistsAction(state, { payload }) {
      state.toplists = payload
    },
    changeArtistsAction(state, { payload }) {
      state.artists = payload
    },
  },
})

export const fecthRecommendDataAction = createAsyncThunk(
  'fetchRecommendData',
  (arg, { dispatch }) => {
    getBanners().then((res) => {
      dispatch(changeBannersAction(res.banners))
    })
    getHotRecommends(8).then((res) => {
      dispatch(changeHotRecommendsAction(res.result))
    })
    getNewAlbums().then((res) => {
      dispatch(changeNewAlbumsAction(res.albums))
    })
    getArtistList(5).then((res) => {
      dispatch(changeArtistsAction(res.artists))
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
    dispatch(changeToplistsAction(toplists))
  })
})

export const {
  changeBannersAction,
  changeHotRecommendsAction,
  changeNewAlbumsAction,
  changeToplistsAction,
  changeArtistsAction,
} = recommendSlice.actions
export default recommendSlice.reducer
