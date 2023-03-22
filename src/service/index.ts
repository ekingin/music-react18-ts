import EKRequest from './request'
import { BASE_URL, TIMEOUT } from './config/index'

const ekRequest = new EKRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn: (config) => {
      return config
    },
  },
})

export default ekRequest
