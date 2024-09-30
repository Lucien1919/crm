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
      newSimPack: rowDara.new_sim_package?.name, //续费SIM卡套餐
      newCloudPack: rowDara.new_cloud_package?.name, //变更云套餐
      simPeriod: rowDara.sim_package_activated_at?.slice(0, 11) + " 至 " + rowDara.sim_package_expired_at?.slice(0, 11), //SIM卡套餐起止日期
      cloudPeriod:
        rowDara.cloud_package_activated_at?.slice(0, 11) + " 至 " + rowDara.cloud_package_expired_at?.slice(0, 11), //SIM卡套餐起止日期
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
    width: 150,
    ellipsis: true
  },
  {
    title: "异常提示",
    dataIndex: "remark",
    width: 150,
    ellipsis: true,
    customRender: ({ value }: any) => {
      let remarks = value ? value.split(",") : "--"
      return value ? remarks[0] : "--"
    }
  },
  {
    title: "续费SIM卡套餐",
    dataIndex: "newSimPack",
    width: 250
  },
  {
    title: "SIM卡套餐续费周期",
    dataIndex: ["new_sim_package", "name"],
    width: 250
  },
  {
    title: "SIM卡套餐起止日期",
    dataIndex: ["new_sim_package", "name"],
    width: 250
  },
  {
    title: "续费云套餐",
    dataIndex: ["new_cloud_package", "name"],
    width: 250,
    ellipsis: true
  },
  {
    title: "云套餐续费周期",
    dataIndex: ["new_cloud_package", "name"],
    width: 250
  },
  {
    title: "云套餐起止日期",
    dataIndex: ["new_cloud_package", "name"],
    width: 150
  },
  {
    title: "原云套餐",
    dataIndex: ["old_cloud_package", "name"],
    width: 200
  },
  {
    title: "原SIM卡套餐",
    dataIndex: ["old_sim_package", "name"],
    width: 200
  },
  {
    title: "续费销售合同编号",
    dataIndex: ["review_request", "po"],
    width: 260
  },
  {
    title: "出厂销售合同编号",
    dataIndex: "old_po",
    width: 260
  }
]
