import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { TopRankingItemWrapper } from './style'
import { getImageSize } from '@/utils/format'
import { useAppDispatch } from '@/store'
import { fetchCurrentSongAction } from '@/store/modules/player'

interface IProps {
  children?: ReactNode
  item: any
}

const TopRankingItem: FC<IProps> = (props) => {
  const { item } = props
  const { tracks = [] } = item

  const dispatch = useAppDispatch()
  function handleAddPlaySong(id: number) {
    dispatch(fetchCurrentSongAction(id))
  }

  return (
    <TopRankingItemWrapper>
      <header className="list-header">
        <div className="image">
          <img src={getImageSize(item?.coverImgUrl, 80)} alt={item?.name} />
          <a href="" className="cover sprite_cover"></a>
        </div>
        <div className="info">
          <h3 className="title">{item?.name}</h3>
          <div className="operation">
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </header>
      <ul className="song-list">
        {tracks?.slice(0, 10)?.map((item: any, index: number) => (
          <li className="item" key={item?.id}>
            <span className="index">{index + 1}</span>
            <div className="info">
              <span className="name">{item?.name}</span>
              <div className="operation">
                <button
                  className="sprite_02 btn play"
                  onClick={() => handleAddPlaySong(item.id)}
                ></button>
                <button className="sprite_icon2 btn addplay"></button>
                <button className="sprite_02 btn favor"></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="footer">
        <Link to="/discover/ranking">查看全部&gt;</Link>
      </div>
    </TopRankingItemWrapper>
  )
}

export default memo(TopRankingItem)
