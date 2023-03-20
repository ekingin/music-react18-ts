import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ICounterState {
  count: number
  frineds: string[]
  direction: 'left' | 'right' | 'center'
}

const initialState: ICounterState = {
  count: 100,
  frineds: [],
  direction: 'left'
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeCountAction(state, { payload }: PayloadAction<number>) {
      state.count = payload
    }
  }
})

export const { changeCountAction } = counterSlice.actions

export default counterSlice.reducer
