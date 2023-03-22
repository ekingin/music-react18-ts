import ekRequest from '@/service'

export const getBanners = () => {
  return ekRequest.get({
    url: '/banner',
  })
}

export const getHotRecommends = (limit = 30) => {
  return ekRequest.get({
    url: '/personalized',
    params: {
      limit,
    },
  })
}

export const getNewAlbums = () => {
  return ekRequest.get({
    url: '/album/newest',
  })
}

export const getPlaylistDetail = (id: number) => {
  return ekRequest.get({
    url: '/playlist/detail',
    params: {
      id,
    },
  })
}
