import { request } from "@/utils/axios"
import { parseQueryStr } from "@/utils"

export const getVerifiCode = async () => {
  const res = await request<string>({
    url: "/captcha?",
    method: "get"
  })
  return res
}

export type LoginParams = {
  username: string
  password: string
  captcha: number
}
export const login = async (data: LoginParams) => {
  const res = await request<string>({
    url: "/systemuser/login",
    method: "post",
    data
  })
  return res
}
