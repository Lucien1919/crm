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
      sn: rowDara.sn, //福达SN
      mac: rowDara.mac, //MAC
      imei: rowDara.imei, //IMEI
      iccid: rowDara.iccid, //ICCID
      pin: rowDara.pin, //PIN
      uuid: rowDara.uuid, //UUID
      others: rowDara.others, //其他
      createdAt: rowDara.created_at, //登记日期
      batchName: rowDara.order_device_batch_name, //出货批次
      deviceType: rowDara.device_type_name, //型号规格
      deliveryTime: rowDara.delivery_time.slice(0, 11), //出货日期
      customName: rowDara.customer_name //标准客户名称
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
    width: 80,
    fixed: "left"
  },
  {
    title: "出货批次",
    dataIndex: "batchName",
    width: 200,
    ellipsis: true,
    fixed: "left"
  },
  {
    title: "型号规格",
    dataIndex: "deviceType",
    width: 250,
    ellipsis: true
  },
  {
    title: "出货日期",
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
    dataIndex: "po",
    width: 250
  },
  {
    title: "福达SN",
    dataIndex: "sn",
    width: 250
  },
  {
    title: "MAC",
    //下划线分割
    dataIndex: "mac",
    width: 250,
    ellipsis: true
  },
  {
    title: "IMEI",
    dataIndex: "imei",
    width: 150
  },
  {
    title: "ICCID",
    dataIndex: "iccid",
    width: 200
  },
  {
    title: "PIN",
    dataIndex: "pin",
    width: 200
  },
  {
    title: "UUID",
    dataIndex: "uuid",
    width: 200
  },
  {
    title: "其他",
    dataIndex: "others",
    width: 260
  },
  {
    title: "登记日期",
    dataIndex: "createdAt",
    width: 260
  },
  {
    title: "操作",
    dataIndex: "op",
    width: 100,
    fixed: "right"
  }
]
