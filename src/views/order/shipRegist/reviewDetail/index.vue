<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getReviewDetailList, type ReviewDetailParams } from "@/api/order"
import { resetFields } from "@/utils"
import { columns, formatTableFun } from "./reviewDetail"
import { useCodeListStore } from "@/stores/codeList"
const CodeListStore = useCodeListStore()

const searchForm = ref<ReviewDetailParams>({
  po: "",
  old_po: "",
  sn: "",
  status: "",
  remark: ""
})
const layout = {
  labelCol: { style: { width: "140px" } }
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

const fileUrl = (name: string) => `${import.meta.env.VITE_API}/attaches/${name}`
onMounted(() => {
  CodeListStore.getCodeList("renewOrder")
  CodeListStore.getCodeList("order")
})
</script>
<template>
  <div class="page-main">
    <div class="page-search">
      <a-form ref="formRef" v-bind="layout" :model="searchForm" @finish="submit">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="续费销售合同编号">
              <a-select
                v-model:value="searchForm.po"
                show-search
                allowClear
                :options="CodeListStore.codeList['renewOrder']"
                :fieldNames="{ label: 'po', value: 'id' }"
                :filter-option="filterCode"
                @change="submit()"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="出厂销售合同编号">
              <a-select
                v-model:value="searchForm.old_po"
                show-search
                allowClear
                :options="CodeListStore.codeList['order']"
                :fieldNames="{ label: 'po', value: 'id' }"
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
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="审批状态">
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
          <a-col :span="8">
            <a-form-item label="异常提示">
              <a-select
                v-model:value="searchForm.remark"
                show-search
                allowClear
                :options="CodeListStore.codeList['check']"
                :fieldNames="{ label: 'name', value: 'id' }"
                :filter-option="filterCode"
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
        :reqApi="getReviewDetailList"
        :formatTableFun="formatTableFun"
      >
        <template #bodyCell="{ column, text, record, index, value }">
          <template v-if="column.dataIndex === 'index'">
            <div>{{ index + (tableRef.pageData.pageNo - 1) * 10 + 1 }}</div>
          </template>
          <template v-if="column.dataIndex === 'remark'">
            <a-tooltip>
              <template #title>
                <span>续费客户SN：{{ value.split(",")[1] ? value.split(",")[1] : "--" }}</span
                ><br />
                <span>客户SN：{{ value.split(",")[2] ? value.split(",")[2] : "--" }}</span>
              </template>
              <div style="color: red">
                {{ value ? value.split(",")[0] : "--" }}
              </div>
            </a-tooltip>
          </template>
          <template v-if="column.dataIndex === 'device_count'">
            <div style="display: flex; justify-content: flex-start">
              <a-progress
                style="width: 70%"
                :show-info="false"
                :percent="
                  (record.order_device_types[0].delivered_device_count / record.order_device_types[0].device_count) *
                  100
                "
              />
              {{ record.order_device_types[0].device_count }}
            </div>
          </template>
          <template v-if="column.dataIndex === 'attach_file'">
            <span v-for="(f, index) in text.split(',')" :key="index">
              <a :href="fileUrl(f)" target="_blank">{{ f.split("_")[1] }}</a>
              <span v-if="index < text.split('_').length - 1"> </span>
            </span>
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
