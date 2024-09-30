import { useCodeListStore } from "@/stores/codeList"
const CodeListStore = useCodeListStore()
import { getCodeName, formatObj } from "@/utils"
import { round } from "lodash-es"

//尽量保持原字段
export const formatTableFun = (tableData: any, type = "search") => {
  const list = [] as any
  tableData.map((rowDara: any) => {
    const row = {
      customName: rowDara.name, //标准客户名称
      userIds: rowDara.user_ids, //客户经理
      multiFactory: getCodeName(CodeListStore.codeList["yesOrNo"], rowDara.multi_factory), //客户多厂区
      invoiceType: getCodeName(CodeListStore.codeList["invoiceType"], rowDara.invoice_type), //客户多厂区
      areaType: getCodeName(CodeListStore.codeList["areaType"], rowDara.area_type), //客户多厂区
      createdAt: rowDara.created_at, //创建时间
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
    title: "标准客户名称",
    dataIndex: "customName",
    width: 200,
    ellipsis: true
  },
  {
    title: "客户经理",
    dataIndex: "userIds",
    width: 200,
    ellipsis: true
    // width: 150
  },
  {
    title: "客户多厂区",
    dataIndex: "multiFactory",
    width: 100
  },
  {
    title: "发票类型",
    dataIndex: "invoiceType",
    width: 150
  },
  {
    title: "区域",
    dataIndex: "areaType",
    width: 100
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    width: 250
  },
  {
    title: "备注",
    //下划线分割
    dataIndex: "remark",
    width: 250
  },
  {
    title: "操作",
    dataIndex: "op",
    width: 150,
    fixed: "right"
  }
]
