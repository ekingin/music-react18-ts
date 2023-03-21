export interface IBannersItem {
  imageUrl: string
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
  exclusive: boolean
  encodeId: string
  scm: string
  bannerBizType: string
}

export interface IRecommendState {
  banners: IBannersItem[]
}
