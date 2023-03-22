import React, { memo, useRef } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { NewAlbumWrapper } from './style'
import SectionHeaderV1 from '@/components/section-header-v1'
import { Carousel } from 'antd'
import { shallowEqualState, useAppSelector } from '@/store'
import NewAlbumItem from '@/components/new-album-item'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  const { newAlbums } = useAppSelector(
    (state) => ({
      newAlbums: state.recommend.newAlbums,
    }),
    shallowEqualState,
  )

  // 轮播图滚动按钮点击事件
  const carouselRef = useRef<ElementRef<typeof Carousel>>(null)
  const carouselPrevBtnClick = () => {
    carouselRef.current?.prev()
  }
  const carouselNextBtnClick = () => {
    carouselRef.current?.next()
  }

  return (
    <NewAlbumWrapper>
      <SectionHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button className="sprite_02 arrow arrow-left" onClick={carouselPrevBtnClick}></button>
        <div className="banner">
          <Carousel ref={carouselRef} dots={false} speed={1200}>
            {[0, 1].map((pageIndex) => (
              <div key={pageIndex}>
                <div className="album-list">
                  {newAlbums.slice(pageIndex * 5, (pageIndex + 1) * 5)?.map((item) => (
                    <NewAlbumItem item={item} key={item.picUrl}></NewAlbumItem>
                  ))}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <button className="sprite_02 arrow arrow-right" onClick={carouselNextBtnClick}></button>
      </div>
    </NewAlbumWrapper>
  )
}

export default memo(NewAlbum)
