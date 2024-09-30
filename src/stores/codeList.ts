import { ref, computed } from "vue"
import { defineStore } from "pinia"
import {
  getUserList,
  getCustomerList,
  getOrderList,
  geDeviceList,
  getDevicePackageList,
  getRenewOrderList,
  getSnModuleList
} from "@/api/codeList"

const codeApiMap = {
  customer: getCustomerList,
  device: geDeviceList,
  user: getUserList,
  order: getOrderList,
  snModule: getSnModuleList,
  devicePackage: getDevicePackageList,
  renewOrder: getRenewOrderList
}

const codeMap = {
  yesOrNo: [
    { id: 1, name: "是" },
    { id: 0, name: "否" }
  ],
  priceCurrency: [
    { id: 1, name: "人民币" },
    { id: 2, name: "美元" }
  ],
  tax: [
    { id: 1, name: "含税" },
    { id: 2, name: "不含税" }
  ],
  timeUnit: [
    { id: 1, name: "月" },
    { id: 2, name: "年" }
  ],
  trafficUnit: [
    { id: 1, name: "MB/月" },
    { id: 2, name: "GB/月" }
  ],
  invoiceType: [
    { id: 1, name: "专用发票" },
    { id: 0, name: "普通发票" }
  ],
  costCount: [
    { id: 1, name: "成本未录" }
    // { id: 0, name: "成本已录" }
  ],
  areaType: [
    { id: 1, name: "境内" },
    { id: 2, name: "境外" }
  ],
  shippingAttach: [
    { id: 0, name: "含出库附件" },
    { id: 1, name: "不含出库附件" }
  ],
  deliveryState: [
    { id: 1, name: "未完成" },
    { id: 2, name: "已完成" }
  ],
  reviewState: [
    { id: 0, name: "全部" },
    { id: 1, name: "审核中" },
    { id: 2, name: "已通过" },
    { id: 3, name: "已驳回" }
  ],
  typeList: [
    { id: 1, name: "设备套餐续费" },
    { id: 5, name: "设备套餐变更当前" },
    { id: 6, name: "设备套餐变更当前及续费" },
    { id: 7, name: "设备套餐到期变更" },
    { id: 2, name: "SIM卡套餐" },
    { id: 3, name: "设备RMA" },
    { id: 4, name: "SIM卡RMA" }
  ],
  orderTypeList: [
    { id: 1, name: "套餐续费" },
    { id: 5, name: "变更当前" },
    { id: 6, name: "变更当前及续费" },
    { id: 7, name: "到期变更" }
  ]
}
type CodeListType = {
  [key: string]: any[]
}
export const useCodeListStore = defineStore("codeList", () => {
  const codeList = ref<CodeListType>(codeMap)
  const getCodeList = async (codeType: keyof typeof codeApiMap) => {
    if (!codeList.value[codeType]) {
      // const str = sessionStorage.getItem(codeType)
      const { data, code } = await codeApiMap[codeType]()
      codeList.value[codeType] = data.list || data
    }
    // return codeList.value[codeType]
  }
  return { codeList, getCodeList }
})
