import { useCodeListStore } from "@/stores/codeList"
const CodeListStore = useCodeListStore()
import { getCodeName, formatObj } from "@/utils"
import { round } from "lodash-es"

//尽量保持原字段
export const formatTableFun = (tableData: any, type = "search") => {
  const list = [] as any
  tableData.map((rowDara: any) => {
    const row = {
      name: rowDara.name, //客户PN码
      customName: rowDara.customer?.name, //标准客户名称
      deviceType: rowDara.device_type.name, //型号规格
      remark: rowDara.remark //备注
    }
    list.push(formatObj(row))
  })
  // if (type == "search") {
  // }
  return list
}

export const columns = [
  {
    title: "序号",
    dataIndex: "index",
    width: 80
  },
  {
    title: "客户PN码",
    dataIndex: "name",
    width: 200,
    ellipsis: true
  },
  {
    title: "标准客户名称",
    dataIndex: "customName",
    width: 200,
    ellipsis: true
    // width: 150
  },
  {
    title: "型号规格",
    dataIndex: "deviceType",
    width: 200,
    ellipsis: true
    // width: 150
  },
  {
    title: "备注",
    dataIndex: "remark",
    width: 150
  },
  {
    title: "操作",
    dataIndex: "op",
    width: 100,
    fixed: "right"
  }
]
