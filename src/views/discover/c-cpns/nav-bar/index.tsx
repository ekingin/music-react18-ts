import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { NavWrapper } from './style'
import { discoverMenu } from '@/assets/data/local-data'

interface IProps {
  children?: ReactNode
}

const NavBar: FC<IProps> = () => {
  return (
    <NavWrapper>
      <div className="wrap-v1100 nav">
        {discoverMenu.map((item) => (
          <div className="item" key={item.link}>
            <NavLink to={item.link}>{item.title}</NavLink>
          </div>
        ))}
      </div>
    </NavWrapper>
  )
}

export default memo(NavBar)
