import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface EKInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => any
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface EKRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: EKInterceptors<T>
}
