<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getDeviceList, type DeviceParams } from "@/api/order"
import { columns, formatTableFun } from "./device"
import { resetFields } from "@/utils"
import { useCodeListStore } from "@/stores/codeList"
const CodeListStore = useCodeListStore()
CodeListStore.getCodeList("customer")
CodeListStore.getCodeList("device")

const searchForm = ref<DeviceParams>({
  po: "",
  device_type_id: "",
  customer_name: "",
  date: ["", ""],
  delivery_time_start: "",
  delivery_time_end: "",
  batch_number: "",
  sn: ""
})
const layout = {
  labelCol: { style: { width: "120px" } }
  // wrapperCol: { span: 20 }
}

const dateChange = (date: any) => {
  if (date && date.length > 1) {
    searchForm.value.delivery_time_start = date[0].format("YYYY-MM-DD")
    searchForm.value.delivery_time_end = date[1].format("YYYY-MM-DD")
  } else {
    searchForm.value.delivery_time_start = ""
    searchForm.value.delivery_time_end = ""
  }
}

const tableRef = ref()
const submit = () => {
  tableRef.value.doQuery()
}

const reset = () => {
  resetFields(searchForm.value)
  tableRef.value.doQuery()
}

const filterCode = (inputValue: string, option: any) => {
  return option.name.indexOf(inputValue) > -1
}
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
                v-model:value="searchForm.customer_name"
                show-search
                allowClear
                :options="CodeListStore.codeList['customer']"
                :fieldNames="{ label: 'name', value: 'name' }"
                :filter-option="filterCode"
                @change="submit()"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="出货批次">
              <a-input v-model:value="searchForm.batch_number"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
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
          <a-col :span="8">
            <a-form-item label="福达SN">
              <a-input v-model:value="searchForm.sn"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="出货日期">
              <a-range-picker style="width: 100%" v-model:value="searchForm.date" @change="dateChange" />
            </a-form-item>
          </a-col>
          <a-col :span="24" style="text-align: right">
            <a-form-item>
              <a-button type="primary" html-type="submit">查询</a-button>
              <a-button style="margin-left: 8px" @click="reset">重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="page-table">
      <pro-table
        ref="tableRef"
        :columns="columns"
        :reqParams="searchForm"
        :reqApi="getDeviceList"
        :formatTableFun="formatTableFun"
      >
        <template #bodyCell="{ column, index }">
          <template v-if="column.dataIndex === 'index'">
            <div>{{ index + (tableRef.pageData.pageNo - 1) * 10 + 1 }}</div>
          </template>
          <template v-if="column.dataIndex === 'op'">
            <div class="op-btn">
              <a-button type="link">删除</a-button>
            </div>
          </template>
        </template>
      </pro-table>
    </div>
  </div>
</template>
<style lang="less" scoped>
.block {
  display: inline-block;
  content: "";
  width: 12px;
  height: 12px;
  margin-right: 3px;
}

.tag-1 {
  margin-left: 12px;
}

.tag-1::before {
  .block();
  background-color: #46a0eff7;
}

.tag-2::before {
  .block();
  background-color: #d6d0d0;
}
</style>
