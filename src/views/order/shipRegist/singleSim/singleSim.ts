import { useCodeListStore } from "@/stores/codeList"
const CodeListStore = useCodeListStore()
import { getCodeName, formatObj } from "@/utils"
import { round } from "lodash-es"

//尽量保持原字段
export const formatTableFun = (tableData: any, type = "search") => {
  const list = [] as any
  tableData.map((rowDara: any) => {
    const row = {
      po: rowDara.po, //销售合同编号
      batchName: rowDara.order_delivery_batch_name, //出货批次
      createdAt: rowDara.created_at, //导入时间
      customName: rowDara.customer, //标准客户名称
      orderId: rowDara.orderid, //销售合同编号
      name: rowDara.sim_package?.name, //SIM卡套餐
      waitDays: rowDara.sim_package_wait_days, //SIM-沉默期/天
      iccid: rowDara.iccid //ICCID
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
    title: "出货批次",
    dataIndex: "batchName",
    width: 200,
    ellipsis: true
  },
  {
    title: "导入时间",
    dataIndex: "createdAt",
    width: 200,
    ellipsis: true
  },
  {
    title: "标准客户名称",
    dataIndex: "customName",
    width: 250,
    ellipsis: true
  },
  {
    title: "销售合同编号",
    dataIndex: "orderId",
    width: 250
  },
  {
    title: "SIM卡套餐",
    dataIndex: "name",
    width: 250
  },
  {
    title: "SIM-沉默期/天",
    dataIndex: "waitDays",
    width: 150
  },
  {
    title: "ICCID",
    dataIndex: "iccid",
    width: 250,
    ellipsis: true
  }
]
