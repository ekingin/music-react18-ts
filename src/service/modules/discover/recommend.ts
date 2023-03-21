import ekRequest from '@/service'

export const getBanners = () => {
  return ekRequest.get({
    url: '/banner'
  })
}
