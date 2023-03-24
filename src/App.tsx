import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '@/router'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import BottomPlayerBar from './views/player/bottom-player-bar'
import { useAppDispatch } from './store'
import { fetchCurrentSongAction } from './store/modules/player'

function App() {
  // 获取歌曲信息
  const dispatch = useAppDispatch()
  useEffect(() => {
    // 默认加载一首歌曲
    dispatch(fetchCurrentSongAction(2029895034))
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="">
        <div>{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />
      <BottomPlayerBar />
    </div>
  )
}

export default App
