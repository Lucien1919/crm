import axios, { AxiosError, type AxiosRequestConfig } from "axios"
import type { InternalAxiosRequestConfig } from "axios"
import { getCookie } from "@/utils/index"
import router from "@/router"
import message from "ant-design-vue/es/message"

export interface ResDataType<T> {
  code?: number
  data?: T
  msg?: string
}
let source = axios.CancelToken.source()

const instance = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_API,
  withCredentials: true
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // if (!config.headers.Authorization && getToken()) {
  //   config.headers.Authorization = getToken()
  // }
  return config
})

instance.interceptors.response.use(
  async ({ config, data }) => {
    // 正常
    if (data.code == 0) {
      return data
    } else {
      // 调用source.cancel后取消
      // source.cancel("取消请求")
    }
  },
  (err: AxiosError) => {
    if (err.status == 401) {
      message.error("登录超时，请重新登录")
      router.push("/login")
      source.cancel("Operation canceled due to 401 Unauthorized.")
      source = axios.CancelToken.source()
    }
    return Promise.reject(err)
  }
)

type CusCofing = {} & AxiosRequestConfig

const request = async <T>(config: CusCofing): Promise<ResDataType<T>> => {
  try {
    //环境判断
    if (import.meta.env.PROD) {
    } else {
    }

    const response = await instance({ ...config, cancelToken: source.token })
    return response
  } catch (error: any) {
    return { msg: error }
  }
}

export { instance, request }
