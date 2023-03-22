import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeaderV1Wrapper } from './style'

interface IProps {
  children?: ReactNode
  title?: string
  keywords?: string[]
  moreTxt?: string
  moreLink?: string
}

const SectionHeader: FC<IProps> = (props) => {
  const { title = '标题', keywords = [], moreTxt = '更多', moreLink = '/' } = props

  return (
    <SectionHeaderV1Wrapper className="sprite_02">
      <div className="left">
        <Link to={moreLink} className="title">
          {title}
        </Link>
        {keywords.length > 0 && (
          <div className="keywords">
            {keywords.map((item) => (
              <div className="item" key={item}>
                <a className="link">{item}</a>
                <span className="divider"> | </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="right">
        <Link to={moreLink} className="more">
          {moreTxt}
        </Link>
        <i className="sprite_02 icon"></i>
      </div>
    </SectionHeaderV1Wrapper>
  )
}

export default memo(SectionHeader)
