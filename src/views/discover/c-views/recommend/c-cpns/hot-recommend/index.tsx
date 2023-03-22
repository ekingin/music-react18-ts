import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HotWrapper } from './style'
import SectionHeaderV1 from '@/components/section-header-v1'
import { shallowEqualState, useAppSelector } from '@/store'
import PlaylistItem from '@/components/playlist-item'

interface IProps {
  children?: ReactNode
}

const HotRecommend: FC<IProps> = () => {
  // 获取热门推荐数据
  const { hotRecommends } = useAppSelector(
    (state) => ({
      hotRecommends: state.recommend.hotRecommends,
    }),
    shallowEqualState,
  )

  return (
    <HotWrapper>
      <SectionHeaderV1
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        moreLink="/discover/playlist"
      />
      <div className="hot-recommend-list">
        {hotRecommends?.map((item) => (
          <PlaylistItem item={item} key={item.name}></PlaylistItem>
        ))}
      </div>
    </HotWrapper>
  )
}

export default memo(HotRecommend)
