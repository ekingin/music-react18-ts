import { configureStore } from '@reduxjs/toolkit'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import recommend from './modules/discover/recommend'

const store = configureStore({
  reducer: {
    recommend
  }
})

// 从 store 中推导出 RootState、AppDispatch 的类型，以便在其他地方使用
export type IRooteState = ReturnType<typeof store.getState>
export type IAppDispatch = typeof store.dispatch

// 对 useSelector 的返回值注入泛型，在页面使用时对参数state进行类型推导
// 对于 useAppDispatch 和 shallowEqualState 也做对应的引用转换，以便他们通过同一个文件引入
export const useAppSelector: TypedUseSelectorHook<IRooteState> = useSelector
export const useAppDispatch: () => IAppDispatch = useDispatch
export const shallowEqualState = shallowEqual

export default store
