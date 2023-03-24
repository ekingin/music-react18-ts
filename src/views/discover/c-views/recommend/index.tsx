import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import TopBanner from './c-cpns/top-banner'
import HotRecommend from './c-cpns/hot-recommend'
import NewAlbum from './c-cpns/new-album'
import { RecommendWrapper } from './style'
import { useAppDispatch } from '@/store'
import {
  fecthRecommendDataAction,
  fetchRankingDataAction,
} from '@/store/modules/discover/recommend'
import TopRanking from './c-cpns/top-ranking'
import UserLogin from './c-cpns/user-login'
import SignedArtist from './c-cpns/signed-artist'
import HotAnchor from './c-cpns/hot-anchor'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  // 获取推荐中数据
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fecthRecommendDataAction())
    dispatch(fetchRankingDataAction())
  }, [])

  return (
    <RecommendWrapper>
      <TopBanner />
      <div className="recommend-content wrap-v980">
        <div className="left">
          <HotRecommend />
          <NewAlbum />
          <TopRanking />
        </div>
        <div className="right">
          <UserLogin />
          <SignedArtist />
          <HotAnchor />
        </div>
      </div>
    </RecommendWrapper>
  )
}

export default memo(Recommend)
