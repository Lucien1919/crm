import { request } from "@/utils/axios"
import { parseQueryStr } from "@/utils"
import type { Dayjs } from "dayjs"
type RangeValue = [Dayjs, Dayjs]

export type OrderParams = {
  customer: string
  device_type_id: string
  delivery_state: string
  po: string
  date: RangeValue | any
  order_time_start: string
  order_time_end: string
}
export const getOrderList = async (params: OrderParams) => {
  const res = await request<any>({
    url: `/order/index?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export type SimParams = {
  customer: string
  po: string
}
export const getSimOrderList = async (params: SimParams) => {
  const res = await request<any>({
    url: `/singlesimorder/index?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export type RenewOrderParams = {
  customer: string
  delivery_state: string
  order_type: string
  date: RangeValue | any
  order_time_start: string
  order_time_end: string
  po: string
  device_type_name: string
  device_package_name: string
}
export const getRenewOrderList = async (params: RenewOrderParams) => {
  const res = await request<any>({
    url: `/reneworder/index?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export const getRenewList = async (params: RenewOrderParams) => {
  const res = await request<any>({
    url: `/renew/index?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export type DeviceParams = {
  po: string
  device_type_id: string
  customer_name: string
  date: RangeValue | any
  delivery_time_start: string
  delivery_time_end: string
  batch_number: string
  sn: string
}

export const getDeviceList = async (params: DeviceParams) => {
  const res = await request<any>({
    url: `/orderdevice/shipindex?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export type SingleSimParams = {
  po: string
  iccids: string
}
export const getSingleSimList = async (params: SingleSimParams) => {
  const res = await request<any>({
    url: `/orderdeliverybatchsim/shipindex?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export type ReviewDetailParams = {
  po: string
  old_po: string
  sn: string
  status: string
  remark: string
}
export const getReviewDetailList = async (params: ReviewDetailParams) => {
  const res = await request<any>({
    url: `/reviewdetail/index?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export type ReviewChangeParams = {
  po: string
  old_po: string
  sn: string
  status: string
}
export const getReviewChangeList = async (params: ReviewChangeParams) => {
  const res = await request<any>({
    url: `/reviewchange/index?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export type ReviewParams = {
  po: string
  customer: string
  status: number
  type: string
}
export const getReviewList = async (params: OrderParams) => {
  const res = await request<any>({
    url: `/review/index?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export type MyReviewParams = {
  type: string
  status: number
  po: string
  customer: string
  request_user_id: string | null
}
export const getMyReviewList = async (params: MyReviewParams) => {
  const res = await request<any>({
    url: `/review/index?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export type CustomerParams = {
  name: string
  manager: string
}
export const getCustomerList = async (params: CustomerParams) => {
  const res = await request<any>({
    url: `/customer/index?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export type PnParams = {
  name: string
}
export const getPnList = async (params: PnParams) => {
  const res = await request<any>({
    url: `/partno/index?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export type DeviceTypeParams = {
  product_name: string
  name: string
  sn_module: string
}
export const getDeviceTypeList = async (params: DeviceTypeParams) => {
  const res = await request<any>({
    url: `/devicetype/index?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export type DevicePackageParams = {
  name: string
  device_type_name: string
  sim_package_id: string
  cloud_package_id: string
}
export const getDevicePackageList = async (params: DevicePackageParams) => {
  const res = await request<any>({
    url: `devicepackage/index?${parseQueryStr(params)}`,
    method: "post"
  })
  return res
}

export type SimPackageParams = {
  name: string
  sim_company: string
}
export const getSimPackageList = async (params: SimPackageParams) => {
  const res = await request<any>({
    url: `simpackage/index?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export const getCloudPackageList = async (params: { name: string }) => {
  const res = await request<any>({
    url: `cloudpackage/index?${parseQueryStr(params)}`,
    method: "get"
  })
  return res
}

export type OrderDeviceParams = {
  sns: string
  customername: string
  device_type_name: string
  po: string
  sim_package_activate_type: string
  delivery_time_start: string
  delivery_time_end: string
}
export const getOrderDeviceList = async (params: OrderDeviceParams) => {
  const res = await request<any>({
    url: `orderdevice/index?${parseQueryStr(params)}`,
    method: "post"
  })
  return res
}

export type OrderDeliveryBatchSimParams = {
  iccids: string
  customer_id: string
  sim_package_id: string
  po: string
  delivery_time_start: string
  delivery_time_end: string
  sim_package_status: string
}
export const getOrderDeliveryBatchSimList = async (params: OrderDeliveryBatchSimParams) => {
  const res = await request<any>({
    url: `orderdeliverybatchsim/index?${parseQueryStr(params)}`,
    method: "post"
  })
  return res
}
