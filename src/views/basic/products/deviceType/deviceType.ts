import { useCodeListStore } from "@/stores/codeList"
const CodeListStore = useCodeListStore()
import { getCodeName, formatObj } from "@/utils"
import { round } from "lodash-es"

//尽量保持原字段
export const formatTableFun = (tableData: any, type = "search") => {
  const list = [] as any
  tableData.map((rowDara: any) => {
    const row = {
      productName: rowDara.product_name, //客户PN码
      devType: rowDara.name, //型号规格
      snModule: rowDara.sn_module?.name, //SN模块
      shippingAttach: getCodeName(CodeListStore.codeList["shippingAttach"], rowDara.shipping_attach), //含出库附件,
      costCount: getCodeName(CodeListStore.codeList["costCount"], rowDara.cost_count), //成本已录,
      updater: rowDara.updater, //最近变更人
      updatedAt: rowDara.updated_at?.slice(0, 11), //最近变更时间
      remark: rowDara.name //remark
    }

    multiFactory: list.push(formatObj(row))
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
    title: "产品名称",
    dataIndex: "productName",
    width: 200,
    ellipsis: true
  },
  {
    title: "型号规格",
    dataIndex: "devType",
    width: 200,
    ellipsis: true
    // width: 150
  },
  {
    title: "SN模块",
    dataIndex: "snModule",
    width: 200,
    ellipsis: true
    // width: 150
  },
  {
    title: "含出库附件",
    dataIndex: "shippingAttach",
    width: 150
  },
  {
    title: "成本已录",
    dataIndex: "costCount",
    width: 150
  },
  {
    title: "最近变更人",
    dataIndex: "updater",
    width: 150
  },
  {
    title: "最近变更时间",
    dataIndex: "updatedAt",
    width: 200,
    ellipsis: true
  },
  {
    title: "备注",
    dataIndex: "remark",
    width: 250
  },
  {
    title: "操作",
    dataIndex: "op",
    width: 200,
    fixed: "right"
  }
]
