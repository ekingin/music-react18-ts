import ekRequest from '@/service'

export function getSongDetail(ids: number[]) {
  return ekRequest.get({
    url: '/song/detail',
    params: {
      ids: ids.join(','),
    },
  })
}

export function getSongLyric(id: number) {
  return ekRequest.get({
    url: '/lyric',
    params: {
      id,
    },
  })
}
