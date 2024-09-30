<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getOrderDeliveryBatchSimList, type MyReviewParams, type OrderDeliveryBatchSimParams } from "@/api/order"
import { getCodeName, resetFields } from "@/utils"
import { useCodeListStore } from "@/stores/codeList"

const CodeListStore = useCodeListStore()

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    width: 80
  },
  {
    title: "ICCID",
    dataIndex: "iccid",
    width: 200,
    ellipsis: true
  },
  {
    title: "出货批次",
    dataIndex: "batch_id",
    width: 200,
    ellipsis: true
  },
  {
    title: "备注",
    dataIndex: "remark",
    width: 200,
    ellipsis: true,
    customRender: ({ value }: any) => {
      return value ? value : "--"
    }
  },
  {
    title: "SIM卡套餐",
    dataIndex: ["simpackage", "name"],
    width: 150
  },
  {
    title: "SIM卡套餐状态",
    dataIndex: "sim_package_status",
    width: 250,
    customRender: ({ value }: any) => {
      let codeName = getCodeName(CodeListStore.codeList["DeviceStatusList"], value)
      codeName = "未知类型	" ? "不可用" : codeName
      return codeName
    }
  },
  {
    title: "SIM卡沉默期",
    dataIndex: "sim_package_wait_days",
    width: 200,
    customRender: ({ value }: any) => {
      return value + "天"
    }
  },
  {
    title: "SIM卡套餐激活时间",
    //下划线分割
    dataIndex: "sim_package_activated_at",
    width: 250,
    ellipsis: true,
    customRender: ({ value, record }: any) => {
      return record.sim_package_status == 1 ? value : "--"
    }
  },
  {
    title: "SIM卡套餐到期日期",
    dataIndex: "sim_package_expired_at",
    width: 200
  },
  {
    title: "SIM卡本月已用流量",
    dataIndex: "op",
    width: 100,
    fixed: "right"
  },
  {
    title: "SIM卡本月剩余流量",
    dataIndex: "op",
    width: 100,
    fixed: "right"
  },
  {
    title: "SIM卡本月套餐外用量",
    dataIndex: "op",
    width: 100,
    fixed: "right"
  },
  {
    title: "操作",
    dataIndex: "op",
    width: 100,
    fixed: "right"
  }
]

const searchForm = ref<OrderDeliveryBatchSimParams>({
  iccids: "",
  customer_id: "",
  sim_package_id: "",
  po: "",
  delivery_time_start: "",
  delivery_time_end: "",
  sim_package_status: ""
  // status: ""
})
const layout = {
  labelCol: { style: { width: "120px" } }
  // wrapperCol: { span: 20 }
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
  resetFields(searchForm.value)
  tableRef.value.doQuery()
}

const filterCode = (inputValue: string, option: any) => {
  return option.name.indexOf(inputValue) > -1
}

const fileUrl = (name: string) => `${import.meta.env.VITE_API}/attaches/${name}`
onMounted(() => {
  CodeListStore.getCodeList("customer")
  CodeListStore.getCodeList("device")
  CodeListStore.getCodeList("simPackage")
})
</script>
<template>
  <div class="page-main">
    <div class="page-search">
      <a-form ref="formRef" v-bind="layout" :model="searchForm" @finish="submit">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="ICCID">
              <a-input v-model:value="searchForm.iccids"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="标准客户名称">
              <a-select
                v-model:value="searchForm.customer_id"
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
            <a-form-item label="SIM卡套餐">
              <a-select
                v-model:value="searchForm.sim_package_id"
                show-search
                allowClear
                :options="CodeListStore.codeList['simPackage']"
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
                @change="submit()"
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
      <pro-table ref="tableRef" :columns="columns" :reqParams="searchForm" :reqApi="getOrderDeliveryBatchSimList">
        <template #bodyCell="{ column, text, index }">
          <template v-if="column.dataIndex === 'index'">
            <div>{{ index + (tableRef.pageData.pageNo - 1) * 10 + 1 }}</div>
          </template>
          <template v-if="column.dataIndex === 'op'">
            <div class="op-btn">
              <a-button type="link">详情</a-button>
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
