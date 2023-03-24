import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { TopRakingWrapper } from './style'
import SectionHeaderV1 from '@/components/section-header-v1'
import { shallowEqualState, useAppSelector } from '@/store'
import TopRankingItem from '../top-ranking-item'

interface IProps {
  children?: ReactNode
}

const TopRaking: FC<IProps> = () => {
  const { toplists } = useAppSelector(
    (state) => ({
      toplists: state.recommend.toplists,
    }),
    shallowEqualState,
  )

  return (
    <TopRakingWrapper>
      <SectionHeaderV1 title="榜单" moreLink="/discover/ranking"></SectionHeaderV1>
      <div className="content">
        {toplists.map((item) => (
          <TopRankingItem item={item} key={item?.name}></TopRankingItem>
        ))}
      </div>
    </TopRakingWrapper>
  )
}

export default memo(TopRaking)
