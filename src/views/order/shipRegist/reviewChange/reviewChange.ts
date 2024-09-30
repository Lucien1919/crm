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
      status: getCodeName(CodeListStore.codeList["reviewState"], rowDara.status), //审批状态
      remark: rowDara.remark.split(",")[0] || "--", //异常提示
      newSimPack: rowDara.new_sim_package?.name, //变更SIM卡套餐
      newCloudPack: rowDara.new_cloud_package?.name, //变更云套餐
      simPeriod:
        (rowDara.sim_package_activated_at?.slice(0, 11) || "--") +
        " 至 " +
        (rowDara.sim_package_expired_at?.slice(0, 11) || "--"), //SIM卡套餐起止日期
      cloudPeriod:
        (rowDara.cloud_package_activated_at?.slice(0, 11) || "--") +
        " 至 " +
        (rowDara.cloud_package_expired_at?.slice(0, 11) || "--"), //SIM卡套餐起止日期
      oldCloudPack: rowDara.old_cloud_package?.name, //原云套餐
      oldSimPack: rowDara.old_sim_package?.name, //原sim套餐
      newPo: rowDara.review_request?.po, //变更销售合同编号
      oldPo: rowDara.old_po //变更销售合同编号
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
    title: "福达SN",
    dataIndex: "sn",
    width: 200,
    ellipsis: true
  },
  {
    title: "审批状态",
    dataIndex: "status",
    width: 200,
    ellipsis: true
  },
  {
    title: "异常提示",
    dataIndex: "remark",
    width: 200,
    ellipsis: true
  },
  {
    title: "变更SIM卡套餐",
    dataIndex: "newSimPack",
    width: 200
  },
  {
    title: "变更云套餐",
    dataIndex: "newCloudPack",
    width: 200
  },
  {
    title: "SIM卡套餐起止日期",
    dataIndex: "simPeriod",
    width: 250
  },
  {
    title: "云套餐起止日期",
    //下划线分割
    dataIndex: "cloudPeriod",
    width: 250,
    ellipsis: true
  },
  {
    title: "原云套餐",
    dataIndex: "oldCloudPack",
    width: 200
  },
  {
    title: "原SIM卡套餐",
    dataIndex: "oldSimPack",
    width: 200
  },
  {
    title: "变更销售合同编号",
    dataIndex: "newPo",
    width: 200
  },
  {
    title: "出厂销售合同编号",
    dataIndex: "oldPo",
    width: 200
  }
]
