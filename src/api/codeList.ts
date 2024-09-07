import { request } from "@/utils/axios"
import { parseQueryStr } from "@/utils"

export const getUserList = async () => {
  const res = await request<any>({
    url: `/user/all`,
    method: "get"
  })
  return res
}

export const getCustomerList = async () => {
  const res = await request<any>({
    url: `/customer/index`,
    method: "get"
  })
  return res
}
export const getOrderList = async () => {
  const res = await request<any>({
    url: `/order/all`,
    method: "get"
  })
  return res
}
export const geDeviceList = async () => {
  const res = await request<any>({
    url: `/devicetype/index`,
    method: "get"
  })
  return res
}
