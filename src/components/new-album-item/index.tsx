import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NewAlbumItemWrapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  item: any
}

const NewAlbumItem: FC<IProps> = (props) => {
  const { item } = props

  return (
    <NewAlbumItemWrapper>
      <div className="top">
        <img src={getImageSize(item.picUrl, 100)} alt="" />
        <a href="" className="cover sprite_cover"></a>
      </div>
      <div className="bottom">
        <div className="name">{item.name}</div>
        <div className="artist">{item.artist.name}</div>
      </div>
    </NewAlbumItemWrapper>
  )
}

export default memo(NewAlbumItem)
