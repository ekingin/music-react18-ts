import { ILyric } from '@/types'

const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lyricStr: string) {
  const lines: string[] = lyricStr.split('\n')

  const lyrics: ILyric[] = []
  for (const line of lines) {
    const results = timeRegExp.exec(line)
    if (!results) continue

    const minute = +results[1] * 60 * 1000
    const seconds = +results[2] * 1000
    const millseconds =
      (+results[3] + '').length === 1
        ? +results[3] * 100
        : (+results[3] + '').length === 2
        ? +results[3] * 10
        : +results[3]
    const time = minute + seconds + millseconds
    const text = line.replace(timeRegExp, '')

    lyrics.push({ time, text })
  }
  return lyrics
}
