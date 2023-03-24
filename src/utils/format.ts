// 获取不同尺寸的图片
export function getImageSize(imageUrl: string, width: number, height: number = width) {
  return imageUrl + `?param=${width}y${height}`
}

// 获取歌曲播放的url
export function getSongPlayUrl(id: number) {
  if (!id) return ''
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

// 格式化播放量
export function formatCount(count: number) {
  if (count > 100000) {
    return Math.floor(count / 10000) + '万'
  } else {
    return count
  }
}

// 格式化歌曲播放进度的时间
export function formatSongTime(time: number) {
  if (!time) return '00:00'
  // 1.毫秒转秒
  const sTime = time / 1000

  // 2.获取分钟和秒钟
  const minutes = Math.floor(sTime / 60)
  const seconds = Math.floor(sTime % 60)

  // 3.格式化分钟和秒钟
  const fMinutes = String(minutes).padStart(2, '0')
  const fSeconds = String(seconds).padStart(2, '0')

  return `${fMinutes}:${fSeconds}`
}
