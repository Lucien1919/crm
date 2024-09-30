<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getReviewList, type ReviewParams } from "@/api/order"
import { getCodeName, resetFields } from "@/utils"
import { columns, formatTableFun } from "./review"
import { useCodeListStore } from "@/stores/codeList"

const CodeListStore = useCodeListStore()
CodeListStore.getCodeList("customer")
CodeListStore.getCodeList("device")
CodeListStore.getCodeList("renewOrder")

const searchForm = ref<ReviewParams>({
  po: "",
  customer: "",
  status: 1,
  type: ""
})

const layout = {
  labelCol: { style: { width: "120px" } }
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
</script>
<template>
  <div class="page-main">
    <div class="page-search">
      <a-form ref="formRef" v-bind="layout" :model="searchForm" @finish="submit">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="标准客户名称">
              <a-select
                v-model:value="searchForm.customer"
                show-search
                allowClear
                :options="CodeListStore.codeList['customer']"
                :fieldNames="{ label: 'po', value: 'name' }"
                :filter-option="filterCode"
                @change="submit()"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="销售合同编号">
              <a-select
                v-model:value="searchForm.po"
                show-search
                allowClear
                :options="CodeListStore.codeList['renewOrder']"
                :fieldNames="{ label: 'po', value: 'name' }"
                :filter-option="filterCode"
                @change="submit()"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="审批类型">
              <a-select
                v-model:value="searchForm.type"
                show-search
                allowClear
                :options="CodeListStore.codeList['typeList']"
                :fieldNames="{ label: 'name', value: 'id' }"
                :filter-option="filterCode"
                @change="submit()"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="状态">
              <a-select
                v-model:value="searchForm.status"
                show-search
                allowClear
                :options="CodeListStore.codeList['reviewState']"
                :fieldNames="{ label: 'name', value: 'id' }"
                :filter-option="filterCode"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="16" style="text-align: right">
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
        :reqApi="getReviewList"
        :formatTableFun="formatTableFun"
      >
        <template #bodyCell="{ column, index }">
          <template v-if="column.dataIndex === 'index'">
            <div>{{ index + (tableRef.pageData.pageNo - 1) * 10 + 1 }}</div>
          </template>
          <template v-if="column.dataIndex === 'op'">
            <div class="op-btn">
              <a-button type="link">详情</a-button>
            </div>
          </template>
        </template>
      </pro-table>
    </div>
  </div>
</template>
