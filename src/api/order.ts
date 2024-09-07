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
