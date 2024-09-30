<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getDeviceTypeList, type DeviceTypeParams } from "@/api/order"
import { resetFields } from "@/utils"
import { columns, formatTableFun } from "./deviceType"
import { useCodeListStore } from "@/stores/codeList"

const CodeListStore = useCodeListStore()
CodeListStore.getCodeList("snModule")
CodeListStore.getCodeList("device")

const searchForm = ref<DeviceTypeParams>({
  product_name: "",
  name: "",
  sn_module: ""
})
const layout = {
  labelCol: { style: { width: "120px" } }
  // wrapperCol: { span: 20 }
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
            <a-form-item label="产品名称">
              <a-select
                v-model:value="searchForm.product_name"
                show-search
                allowClear
                :options="CodeListStore.codeList['device']"
                :fieldNames="{ label: 'product_name', value: 'product_name' }"
                :filter-option="filterCode"
                @change="submit()"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="型号规格">
              <a-input v-model:value="searchForm.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="SN模块">
              <a-select
                v-model:value="searchForm.sn_module"
                show-search
                allowClear
                :options="CodeListStore.codeList['snModule']"
                :fieldNames="{ label: 'name', value: 'id' }"
                :filter-option="filterCode"
                @change="submit()"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
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
        :reqApi="getDeviceTypeList"
        :formatTableFun="formatTableFun"
      >
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'index'">
            <div>{{ index + (tableRef.pageData.pageNo - 1) * 10 + 1 }}</div>
          </template>
          <template v-if="column.dataIndex === 'op'">
            <div class="op-btn">
              <a-button type="link">编辑</a-button>
              <a-button type="link">编辑成本</a-button>
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
