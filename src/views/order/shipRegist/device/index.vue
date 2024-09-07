<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getOrderList, type OrderParams } from "@/api/order"
import { resetFields } from "@/utils"
import { useCodeListStore } from "@/stores/codeList"
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt"
const CodeListStore = useCodeListStore()

const columns = [
  {
    title: "销售合同编号",
    dataIndex: "po",
    width: 200,
    ellipsis: true
  },
  {
    title: "标准客户名称",
    dataIndex: ["customer", "name"],
    width: 200,
    ellipsis: true
    // width: 150
  },
  {
    title: "型号规格",
    dataIndex: ["order_device_types", 0, "device_type_name"],
    width: 200,
    ellipsis: true
    // width: 150
  },
  {
    title: "销售不含税价",
    dataIndex: ["order_device_types", 0, "unit_price"],
    width: 150
  },
  {
    title: "销售含税价",
    dataIndex: ["order_device_types", 0, "tax_rate"],
    width: 150
  },
  {
    title: "下单总数",
    dataIndex: ["order_device_types", 0, "device_count"],
    width: 150
  },
  {
    title: "附件",
    //下划线分割
    dataIndex: ["order_device_types", 0, "attach_file"],
    width: 150
  },
  {
    title: "合同签订日期",
    dataIndex: "order_time",
    width: 150,
    customRender: ({ value }: any) => value.slice(0, 11)
  },
  {
    title: "客户经理",
    dataIndex: "",
    width: 150
  },
  {
    title: "收款条件",
    dataIndex: ["delivery_type", "name"],
    width: 200
  },
  {
    title: "状态",
    dataIndex: "",
    width: 150
  },
  {
    title: "操作",
    dataIndex: "op",
    width: 260,
    fixed: "right"
  }
]

const searchForm = ref<OrderParams>({
  customer: "",
  device_type_id: "",
  delivery_state: "",
  po: "",
  date: ["", ""],
  order_time_start: "",
  order_time_end: ""
})
const layout = {
  labelCol: { style: { width: "120px" } }
  // wrapperCol: { span: 20 }
}

const dateChange = (date: any) => {
  if (date && date.length > 1) {
    searchForm.value.order_time_start = date[0].format("YYYY-MM-DD")
    searchForm.value.order_time_end = date[1].format("YYYY-MM-DD")
  } else {
    searchForm.value.order_time_start = ""
    searchForm.value.order_time_end = ""
  }
}

const formatTableFun = (tableData: any) => {
  const list = []
  tableData.map((item: any) => {
    item.op = "操作"
  })
  return tableData
}

const tableRef = ref()
const submit = () => {
  tableRef.value.doQuery()
}

const reset = () => {
  console.log(searchForm.value)
  tableRef.value.doQuery()
}

const filterCode = (inputValue: string, option: any) => {
  console.log(inputValue, option.name)

  return option.name.indexOf(inputValue) > -1
}
onMounted(() => {
  //
  CodeListStore.getCodeList("customer")
  CodeListStore.getCodeList("device")
})
</script>
<template>
  <div class="page-main">
    <div class="page-search">
      <a-form ref="formRef" v-bind="layout" :model="searchForm" @finish="submit">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="销售合同编号">
              <a-input v-model:value="searchForm.po"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="标准客户名称">
              <a-select
                v-model:value="searchForm.customer"
                show-search
                allowClear
                :options="CodeListStore.codeList['customer']"
                :fieldNames="{ label: 'name', value: 'id' }"
                :filter-option="filterCode"
                @change="submit()"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="型号规格">
              <a-select
                v-model:value="searchForm.device_type_id"
                show-search
                allowClear
                :options="CodeListStore.codeList['device']"
                :fieldNames="{ label: 'name', value: 'id' }"
                :filter-option="filterCode"
                @change="submit()"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="出货状态">
              <a-select
                v-model:value="searchForm.delivery_state"
                show-search
                :options="CodeListStore.codeList['deliveryState']"
                :fieldNames="{ label: 'name', value: 'id' }"
                :filter-option="filterCode"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同签订日期">
              <a-range-picker style="width: 100%" v-model:value="searchForm.date" @change="dateChange" />
            </a-form-item>
          </a-col>
          <a-col :span="8" style="text-align: right">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin-left: 8px" @click="reset">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="page-table">
      <pro-table ref="tableRef" :columns="columns" :reqParams="searchForm" :reqApi="getOrderList">
        <template #bodyCell="{ column }">
          <template v-if="column.dataIndex === 'op'">
            <div class="op-btn">
              <a-button type="link">出货</a-button>
              <a-button type="link">编辑</a-button>
              <a-button type="link">删除</a-button>
              <a-button type="link">出货编辑</a-button>
            </div>
          </template>
        </template>
      </pro-table>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
