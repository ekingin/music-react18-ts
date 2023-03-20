import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { EKRequestConfig } from './type'

class EKRequest {
  instance: AxiosInstance

  constructor(config: EKRequestConfig) {
    this.instance = axios.create(config)

    // 1.全局拦截器
    this.instance.interceptors.request.use(
      (config) => config,
      (err) => err
    )

    this.instance.interceptors.response.use(
      (res) => res.data,
      (err) => err
    )

    // 2.实例拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )

    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  request<T = any>(config: EKRequestConfig<T>) {
    // 3.1单次请求的请求成功拦截
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors?.requestSuccessFn(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 3.2单次请求的响应成功拦截
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors?.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }

  get<T = any>(config: EKRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: EKRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: EKRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: EKRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default EKRequest
