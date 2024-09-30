<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getCustomerList, type CustomerParams } from "@/api/order"
import { resetFields } from "@/utils"
import { columns, formatTableFun } from "./customers"
import { useCodeListStore } from "@/stores/codeList"

const CodeListStore = useCodeListStore()

const searchForm = ref<CustomerParams>({
  name: "",
  manager: ""
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
  console.log(inputValue, option.name)

  return option.name.indexOf(inputValue) > -1
}
onMounted(() => {
  CodeListStore.getCodeList("customer")
  CodeListStore.getCodeList("user")
})
</script>
<template>
  <div class="page-main">
    <div class="page-search">
      <a-form ref="formRef" v-bind="layout" :model="searchForm" @finish="submit">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="标准客户名称">
              <a-select
                v-model:value="searchForm.name"
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
            <a-form-item label="客户经理">
              <a-select
                v-model:value="searchForm.manager"
                show-search
                allowClear
                :options="CodeListStore.codeList['user']"
                :fieldNames="{ label: 'name', value: 'id' }"
                :filter-option="filterCode"
                @change="submit()"
              ></a-select>
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
      <pro-table
        ref="tableRef"
        :columns="columns"
        :reqParams="searchForm"
        :reqApi="getCustomerList"
        :formatTableFun="formatTableFun"
      >
        <template #bodyCell="{ column, index }">
          <template v-if="column.dataIndex === 'index'">
            <div>{{ index + (tableRef.pageData.pageNo - 1) * 10 + 1 }}</div>
          </template>
          <template v-if="column.dataIndex === 'op'">
            <div class="op-btn">
              <a-button type="link">编辑</a-button>
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
