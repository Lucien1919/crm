import { useCodeListStore } from "@/stores/codeList"
const CodeListStore = useCodeListStore()
import { getCodeName, formatObj } from "@/utils"
import { round } from "lodash-es"

//尽量保持原字段
export const formatTableFun = (tableData: any, type = "search") => {
  const list = [] as any
  tableData.map((rowDara: any) => {
    const row = {
      po: rowDara.order?.po, //销售合同编号
      customName: rowDara.customer_name, //标准客户名称
      type: getCodeName(CodeListStore.codeList["orderTypeList"], rowDara.type), //审批类型
      status: getCodeName(CodeListStore.codeList["reviewState"], rowDara.status), //状态
      requestUser: rowDara.request_user?.name, //申请人
      createdAt: rowDara.created_at?.slice(0, 11), //申请时间
      reviewUser: rowDara.review_user?.name, //审批人
      reviewedAt: rowDara.reviewed_at?.slice(0, 11) //审批时间
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
    title: "销售合同编号",
    dataIndex: "po",
    width: 200,
    ellipsis: true
  },
  {
    title: "标准客户名称",
    dataIndex: "customName",
    width: 200,
    ellipsis: true
  },
  {
    title: "审批类型",
    dataIndex: "type",
    width: 200
  },
  {
    title: "状态",
    dataIndex: "status",
    width: 150
  },
  {
    title: "申请人",
    dataIndex: "requestUser",
    width: 150
  },
  {
    title: "申请时间",
    dataIndex: "createdAt",
    width: 200
  },
  {
    title: "审批人",
    dataIndex: "reviewUser",
    width: 150,
    ellipsis: true
  },
  {
    title: "审批时间",
    dataIndex: "reviewedAt",
    width: 200
  },
  {
    title: "操作",
    dataIndex: "op",
    width: 100,
    fixed: "right"
  }
]
