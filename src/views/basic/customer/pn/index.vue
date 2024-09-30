<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getPnList, type PnParams } from "@/api/order"
import { resetFields } from "@/utils"
import { columns, formatTableFun } from "./pn"
import { useCodeListStore } from "@/stores/codeList"

const CodeListStore = useCodeListStore()

const searchForm = ref<PnParams>({
  name: ""
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

const fileUrl = (name: string) => `${import.meta.env.VITE_API}/attaches/${name}`
</script>
<template>
  <div class="page-main">
    <div class="page-search">
      <a-form ref="formRef" v-bind="layout" :model="searchForm" @finish="submit">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="客户PN码">
              <a-input v-model:value="searchForm.name"></a-input>
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
        :reqApi="getPnList"
        :formatTableFun="formatTableFun"
      >
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'index'">
            <div>{{ index + (tableRef.pageData.pageNo - 1) * 10 + 1 }}</div>
          </template>
          <template v-if="column.dataIndex === 'op'">
            <div class="op-btn">
              <a-button type="link">编辑</a-button>
              <a-button type="link">删除</a-button>
            </div>
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
          <template v-if="column.dataIndex === 'status'">
            <div style="display: flex; justify-content: flex-start">
              <a-button type="link">{{ text === 0 || text === 2 ? "未开票" : "开票" }}</a-button>
              <a-button type="link">{{ text === 0 || text === 1 ? "未收款" : "收款" }}</a-button>
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
