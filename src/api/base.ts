import { request } from "@/utils/axios"

export const getVerifiCode = async () => {
  const res = await request<string>({
    url: "/captcha?",
    method: "get"
  })
  return res
}
