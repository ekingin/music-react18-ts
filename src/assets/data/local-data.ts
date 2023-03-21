export const headerTitles = [
  {
    title: '发现音乐',
    type: 'path',
    link: '/discover'
  },
  {
    title: '我的音乐',
    type: 'path',
    link: '/mine'
  },
  {
    title: '关注',
    type: 'path',
    link: '/focus'
  },
  {
    title: '商城',
    type: 'link',
    link: 'https://music.163.com/store/product'
  },
  {
    title: '音乐人',
    type: 'link',
    link: 'https://music.163.com/st/musician'
  },
  {
    title: '下载客户端',
    type: 'path',
    link: '/download'
  }
]

export interface IDiscoverMenuItem {
  title: string
  link: string
}
export const discoverMenu = [
  {
    title: '推荐',
    link: '/discover/recommend'
  },
  {
    title: '排行榜',
    link: '/discover/ranking'
  },
  {
    title: '歌单',
    link: '/discover/playlist'
  },
  {
    title: '主播电台',
    link: '/discover/djradio'
  },
  {
    title: '歌手',
    link: '/discover/artist'
  },
  {
    title: '新碟上架',
    link: '/discover/album'
  }
]
