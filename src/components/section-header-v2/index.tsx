import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SectionHeaderV2Wrapper } from './style'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  title?: string
  moreTxt?: string
  moreLink?: string
}

const SectionHeaderV2: FC<IProps> = (props) => {
  const { title = '默认标题', moreTxt, moreLink } = props

  return (
    <SectionHeaderV2Wrapper>
      <h3 className="title">{title}</h3>
      {moreTxt && moreLink && (
        <Link className="link" to={moreLink}>
          {moreTxt} &gt;
        </Link>
      )}
    </SectionHeaderV2Wrapper>
  )
}

export default memo(SectionHeaderV2)
