import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SignedArtistWrapper } from './style'
import SectionHeaderV2 from '@/components/section-header-v2'
import { shallowEqualState, useAppSelector } from '@/store'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const SignedArtist: FC<IProps> = () => {
  const { artists } = useAppSelector(
    (state) => ({
      artists: state.recommend.artists,
    }),
    shallowEqualState,
  )

  return (
    <SignedArtistWrapper>
      <SectionHeaderV2 title="入驻主播" moreTxt="查看全部" moreLink="/discover/artist" />
      <div className="artist-list">
        {artists.map((item) => (
          <div className="artist-item" key={item?.id}>
            <img className="avatar" src={getImageSize(item?.picUrl, 80)} alt="" />
            <div className="info">
              <div className="name">{item?.name}</div>
              <div className="alias">{item?.alias.join(' ')}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="apply-for">
        <a className="sprite_button" href="#/">
          <i className="sprite_button">申请成为网易音乐人</i>
        </a>
      </div>
    </SignedArtistWrapper>
  )
}

export default memo(SignedArtist)
