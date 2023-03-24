import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HotAnchorWrapper } from './style'
import SectionHeaderV2 from '@/components/section-header-v2'
import { hotRadios } from '@/assets/data/local-data'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const HotAnchor: FC<IProps> = () => {
  return (
    <HotAnchorWrapper>
      <SectionHeaderV2 title="热门主播" />
      <div className="hot-anchors">
        {hotRadios.map((item) => {
          return (
            <div className="item" key={item.picUrl}>
              <img src={getImageSize(item.picUrl, 40)} alt={item.name} />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="position">{item.position}</div>
              </div>
            </div>
          )
        })}
      </div>
    </HotAnchorWrapper>
  )
}

export default memo(HotAnchor)
