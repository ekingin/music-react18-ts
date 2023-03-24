import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '@/service/modules/play'
import { CURRENT_SONG } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { parseLyric } from '@/utils/map'
import type { ILyric } from '@/types'
import { IRooteState } from '@/store'

interface IState {
  currentSong: any
  lyrics: ILyric[]
  lyricsIndex: number
  songsList: any[]
  songsIndex: number
  playMode: number
}

interface IThunkState {
  state: IRooteState
}

const initialState: IState = {
  currentSong: localCache.getCache(CURRENT_SONG) ?? {},
  lyrics: [],
  lyricsIndex: -1,
  songsList: [],
  songsIndex: -1,
  playMode: 0, // 0:顺序, 1:随机, 2:单曲
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricsIndex = payload
    },
    changeSongsListAction(state, { payload }: PayloadAction<any[]>) {
      state.songsList.length = 0
      state.songsList.push(...payload)
    },
    changeSongsIndexAction(state, { payload }) {
      state.songsIndex = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
    },
  },
})

export const fetchCurrentSongAction = createAsyncThunk<void, number, IThunkState>(
  'fetchCurrentSongAction',
  (id, { dispatch, getState }) => {
    // 1.先播放列表中查找要播放的歌曲，找不到再请求
    const { songsList } = getState().player
    const findIndex = songsList.findIndex((item) => item.id === id)
    if (findIndex === -1) {
      // 1.获取歌曲信息
      getSongDetail([id]).then((res) => {
        if (!res?.songs.length) return
        const song = res?.songs[0]
        dispatch(changeCurrentSongAction(song))
        localCache.setCache(CURRENT_SONG, song)
        dispatch(changeSongsListAction([...songsList, song]))
        dispatch(changeSongsIndexAction(songsList.length - 1))
      })
    } else {
      const song = songsList[findIndex]
      dispatch(changeCurrentSongAction(song))
      dispatch(changeSongsIndexAction(findIndex))
    }

    // 2.获取歌词信息
    getSongLyric(id).then((res) => {
      const lyricStr = res.lrc.lyric
      const parsedLyric = parseLyric(lyricStr)
      dispatch(changeLyricsAction(parsedLyric))
    })
  },
)

export const switchCurrentSongAction = createAsyncThunk<void, boolean, IThunkState>(
  'switchCurrentSongAction',
  (isNext, { dispatch, getState }) => {
    const { songsList, songsIndex, playMode } = getState().player

    // 1.根据播放模式，计算最新的播放列表中的当前歌曲的下标
    let newIndex = songsIndex
    if (playMode === 1) {
      // 随机播放
      newIndex = Math.floor(Math.random() * songsList.length)
    } else {
      // 单曲循环/顺序播放
      newIndex = newIndex + (isNext ? 1 : -1)
      if (newIndex > songsList.length - 1) newIndex = 0
      if (newIndex < 0) newIndex = songsList.length - 1
    }

    // 2.设置当前歌曲及其在播放列表中的下标
    const song = songsList[newIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changeSongsIndexAction(newIndex))

    // 3.请求新歌词
    getSongLyric(song.id).then((res) => {
      const lyricStr = res.lrc.lyric
      const parsedLyric = parseLyric(lyricStr)
      dispatch(changeLyricsAction(parsedLyric))
    })
  },
)

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction,
  changeSongsListAction,
  changeSongsIndexAction,
  changePlayModeAction,
} = playerSlice.actions

export default playerSlice.reducer
