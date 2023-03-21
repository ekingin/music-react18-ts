import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import TopBanner from './c-cpns/top-banner'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  return (
    <div>
      <TopBanner />
      Recommend
    </div>
  )
}

export default memo(Recommend)
