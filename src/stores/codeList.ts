import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { getUserList, getCustomerList, getOrderList, geDeviceList } from "@/api/codeList"

const codeApiMap = {
  customer: getCustomerList,
  device: geDeviceList,
  user: getUserList,
  order: getOrderList
}

const codeMap = {
  deliveryState: [
    { id: 1, name: "未完成" },
    { id: 2, name: "已完成" }
  ]
}
type CodeListType = {
  [key: string]: any[]
}
export const useCodeListStore = defineStore("codeList", () => {
  const codeList = ref<CodeListType>(codeMap)
  const getCodeList = async (codeType: keyof typeof codeApiMap) => {
    if (!codeList.value[codeType]) {
      const str = sessionStorage.getItem(codeType)
      const { data, code } = await codeApiMap[codeType]()
      console.log(data.list)
      sessionStorage.setItem(codeType, data.list)
      codeList.value[codeType] = data.list
    }
    // return codeList.value[codeType]
  }
  return { codeList, getCodeList }
})
