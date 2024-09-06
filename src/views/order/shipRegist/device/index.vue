<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getOrderList, type OrderParams } from "@/api/order"
import { resetFields } from "@/utils"

const columns = [
  {
    title: "销售合同编号",
    dataIndex: "po"
    // width: 150
  },
  {
    title: "标准客户名称",
    dataIndex: "name"
    // width: 150
  },
  {
    title: "型号规格",
    dataIndex: ""
    // width: 150
  },
  {
    title: "销售不含税价",
    dataIndex: "unit_price"
    // width: 150
  },
  {
    title: "销售含税价",
    dataIndex: ""
    // width: 150
  },
  {
    title: "下单总数",
    dataIndex: "device_count"
    // width: 150
  },
  {
    title: "附件",
    dataIndex: "device_count"
    // width: 150
  },
  {
    title: "操作",
    dataIndex: "op",
    width: 150,
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
  console.log(searchForm.value)
  tableRef.value.doQuery()
}

const reset = () => {
  resetFields(searchForm.value)
  tableRef.value.doQuery()
}
onMounted(() => {
  //
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
              <a-input v-model:value="searchForm.customer"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="型号规格">
              <a-input v-model:value="searchForm.device_type_id"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="出货状态">
              <a-input v-model:value="searchForm.delivery_state"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同签订日期">
              <a-range-picker style="width: 100%" v-model:value="searchForm.date" @change="dateChange" />
            </a-form-item>
          </a-col>
          <a-col :span="8" style="text-align: right">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin: 0 8px" @click="reset">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="page-table">
      <pro-table ref="tableRef" :columns="columns" :reqParams="searchForm" :reqApi="getOrderList">
        <template #bodyCell="{ column }">
          <template v-if="column.dataIndex === 'op'">
            <a>action</a>
          </template>
        </template>
      </pro-table>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
