export const columns = [
  {
    title: "序号",
    dataIndex: "index",
    width: 80,
    ellipsis: true,
    fixed: "left"
  },
  {
    title: "销售合同编号",
    dataIndex: "po",
    width: 200,
    ellipsis: true,
    fixed: "left"
  },
  {
    title: "订单类型",
    dataIndex: "orderType",
    width: 200
  },
  {
    title: "标准客户名称",
    dataIndex: "customName",
    width: 200,
    ellipsis: true
  },
  {
    title: "型号规格",
    dataIndex: "devType",
    width: 150
  },
  {
    title: "套餐名称",
    dataIndex: "devPackId",
    width: 150
  },
  {
    title: "价格(税率)",
    dataIndex: "unitPrice",
    width: 200
  },
  {
    title: "下单总数",
    dataIndex: "devCount",
    width: 350
  },
  {
    title: "附件",
    dataIndex: "files",
    width: 250
  },
  {
    title: "合同签订日期",
    dataIndex: "orderTime",
    width: 150
  },
  {
    title: "客户经理",
    dataIndex: "userId",
    width: 150
  },
  {
    title: "收款条件",
    dataIndex: "deliveryType",
    width: 200
  },
  {
    title: "状态",
    dataIndex: "status",
    width: 200
  },
  {
    title: "操作",
    dataIndex: "op",
    width: 260,
    fixed: "right"
  }
]
