import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { PlaylistItemWrapper } from './style'
import { getImageSize, formatCount } from '@/utils/format'

interface IProps {
  children?: ReactNode
  item: any
}

const PlaylistItem: FC<IProps> = (props) => {
  const { item } = props

  return (
    <PlaylistItemWrapper>
      <div className="top">
        <img src={getImageSize(item.picUrl, 140)} alt="" />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon headset"></i>
              <span className="count">{formatCount(item.playCount)}</span>
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <p className="bottom">{item.name}</p>
    </PlaylistItemWrapper>
  )
}

export default memo(PlaylistItem)
