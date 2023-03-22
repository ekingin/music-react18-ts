import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { Carousel } from 'antd'
import classNames from 'classnames'
import { BannerControler, BannerLeft, BannerRight, BannerWrapper } from './style'
import { useAppSelector, shallowEqualState } from '@/store'

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  const carouselRef = useRef<ElementRef<typeof Carousel>>(null)
  const [bannerIndex, setBannerIndex] = useState(0)

  // 获取轮播图数据
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners,
    }),
    shallowEqualState,
  )

  // 轮播图切换事件
  const carouselAfterChange = (current: number) => {
    setBannerIndex(current)
  }

  // 轮播图按钮点击
  const prevBtnClick = () => {
    carouselRef.current?.prev()
  }
  const nextBtnClick = () => {
    carouselRef.current?.next()
  }

  // 记录当前轮播图图片的url
  let bgImageUrl
  if (bannerIndex >= 0 && banners?.length > 0) {
    bgImageUrl = banners[bannerIndex].imageUrl + '?imageView&blur=40x20'
  }

  return (
    <BannerWrapper style={{ background: `url('${bgImageUrl}') center center / 6000px` }}>
      <div className="banner wrap-v980">
        <BannerLeft>
          <Carousel
            autoplay
            dots={false}
            effect="fade"
            ref={carouselRef}
            afterChange={carouselAfterChange}
          >
            {banners?.map((item) => (
              <div className="banner-item" key={item.imageUrl}>
                <img className="image" src={item.imageUrl} alt={item.encodeId} />
              </div>
            ))}
          </Carousel>
          <ul className="dots">
            {banners?.map((item, index) => (
              <li key={item.imageUrl}>
                <span className={classNames('item', { active: bannerIndex === index })}></span>
              </li>
            ))}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControler>
          <button className="btn left" onClick={prevBtnClick}></button>
          <button className="btn right" onClick={nextBtnClick}></button>
        </BannerControler>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
