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
export const getDevicePackageList = async () => {
  const res = await request<any>({
    url: `/customer/index`,
    method: "post"
  })
  return res
}
export const getRenewOrderList = async () => {
  const res = await request<any>({
    url: `/reneworder/all`,
    method: "get"
  })
  return res
}
export const getSingleSimList = async () => {
  const res = await request<any>({
    url: `/singlesimorder/all`,
    method: "get"
  })
  return res
}

export const getSnModuleList = async () => {
  const res = await request<any>({
    url: `/snmodule/index`,
    method: "get"
  })
  return res
}

export const getSimPackageList = async () => {
  const res = await request<any>({
    url: `/simpackage/index`,
    method: "get"
  })
  return res
}

export const getCloudPackageList = async () => {
  const res = await request<any>({
    url: `/cloudpackage/index`,
    method: "get"
  })
  return res
}
