import React, { memo, Suspense } from 'react'
import { Outlet, Link } from 'react-router-dom'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Discover: FC<IProps> = () => {
  return (
    <div>
      <div>
        <Link to="/discover/">推荐</Link>
        <Link to="/discover/ranking">排行榜</Link>
        <Link to="/discover/playlist">歌单</Link>
        <Link to="/discover/djradio">主播电台</Link>
        <Link to="/discover/artist">歌手</Link>
        <Link to="/discover/album">新碟上架</Link>
      </div>
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default memo(Discover)
