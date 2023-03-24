import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { BarController, BarOperator, BarSongInfo, PlayerBarWrapper } from './style'
import { Slider, message } from 'antd'
import { Link } from 'react-router-dom'
import { shallowEqualState, useAppDispatch, useAppSelector } from '@/store'
import { formatSongTime, getImageSize, getSongPlayUrl } from '@/utils/format'
import {
  changeLyricIndexAction,
  changePlayModeAction,
  switchCurrentSongAction,
} from '@/store/modules/player'

interface IProps {
  children?: ReactNode
}

const BottomPlayerBar: FC<IProps> = () => {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentSongImg, setCurrentSongImg] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSliding, setIsSliding] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // 获取当前歌曲信息
  const dispatch = useAppDispatch()
  const { currentSong, lyrics, lyricsIndex, playMode, songsList } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricsIndex: state.player.lyricsIndex,
      playMode: state.player.playMode,
      songsList: state.player.songsList,
    }),
    shallowEqualState,
  )

  useEffect(() => {
    // 设置audio src
    audioRef.current!.src = getSongPlayUrl(currentSong?.id)

    // 自动播放
    audioRef.current
      ?.play()
      .then((res) => {
        setIsPlaying(true)
        console.log('播放成功', res)
      })
      .catch((err) => {
        setIsPlaying(false)
        console.log('播放失败', err)
      })

    // 保存歌曲总时长
    setDuration(currentSong?.dt)

    // 设置当前播放歌曲的图片地址
    const imgUrl = currentSong?.al?.picUrl
      ? getImageSize(currentSong?.al?.picUrl, 50)
      : require('@/assets/img/default_album.jpg')
    setCurrentSongImg(imgUrl)
  }, [currentSong])

  // 播放/暂停
  function handlePlayBtnClick() {
    // 1.播放/暂停音乐
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    // 2.改变当前播放的状态
    setIsPlaying(!isPlaying)
  }

  // 上一首/下一首
  function handleSwitchCurrentSong(isNext = false) {
    dispatch(switchCurrentSongAction(isNext))
  }

  // audio播放的当前时间更新
  function handleAudioTimeUpdate() {
    // 1.获取当前歌曲的时间，并转为毫秒
    const currentTime = audioRef.current!.currentTime * 1000

    // 2.当不是滑动进度条时，计算歌曲当前的播放进度、播放时间
    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setCurrentTime(currentTime)
    }

    // 3.匹配歌词
    let index = lyrics.length - 1
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].time > currentTime) {
        index = i - 1
        break
      }
    }

    // 当index发生变化时，保存新的index
    if (index === -1 || lyricsIndex === index) return
    dispatch(changeLyricIndexAction(index))

    // 使用message展示歌词
    message.open({
      content: lyrics[index].text,
      key: 'lyric',
      duration: 0,
    })
  }

  // 播放进度滑动过程中/点击修改后
  function handleSliderChanging(value: number) {
    // 1.设置当前进度条处于滑动状态
    setIsSliding(true)

    // 2.设置进度
    setProgress(value)

    // 3.设置滑动的某一时刻的时间
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }

  // 播放进度点击修改后
  function handleSliderChanged(value: number) {
    // 1.计算当前播放时间
    const currentTime = (value / 100) * duration

    // 2.设置当前播放的时间
    audioRef.current!.currentTime = currentTime / 1000

    // 3.设置变量
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(false)
  }

  // 播放模式改变
  function hanldeChangePlayMode() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
  }

  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v980">
        <BarController isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => handleSwitchCurrentSong(false)}
          ></button>
          <button className="btn sprite_playbar play" onClick={handlePlayBtnClick}></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handleSwitchCurrentSong(true)}
          ></button>
        </BarController>
        <BarSongInfo>
          <Link to="/player" className="image">
            <img src={currentSongImg} alt={currentSong?.name} />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              <Slider
                value={progress}
                step={0.1}
                tooltip={{ formatter: null }}
                onChange={handleSliderChanging}
                onAfterChange={handleSliderChanged}
              />
              <div className="time">
                <span className="current">{formatSongTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatSongTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarSongInfo>
        <BarOperator playMode={playMode}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button className="btn sprite_playbar loop" onClick={hanldeChangePlayMode}></button>
            <button className="btn sprite_playbar playlist">
              <span className="count">{songsList.length}</span>
            </button>
          </div>
        </BarOperator>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleAudioTimeUpdate} />
    </PlayerBarWrapper>
  )
}

export default memo(BottomPlayerBar)
