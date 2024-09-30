<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getOrderDeviceList, type getOrderDeviceListParams } from "@/api/order"
import { resetFields } from "@/utils"
import { useCodeListStore } from "@/stores/codeList"

const CodeListStore = useCodeListStore()

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    width: 80,
    fixed: "left"
  },
  {
    title: "福达SN",
    dataIndex: "sn",
    width: 200,
    ellipsis: true,
    fixed: "left"
  },
  {
    title: "ICCID",
    dataIndex: "iccid",
    width: 200,
    ellipsis: true
    // width: 150
  },
  {
    title: "标准客户名称",
    dataIndex: "customer",
    width: 200,
    ellipsis: true
    // width: 150
  },
  {
    title: "型号规格",
    dataIndex: "device_type",
    width: 150
  },
  {
    title: "销售合同编号",
    dataIndex: "po",
    width: 100
  },
  {
    title: "出货日期",
    dataIndex: "delivery_time",
    width: 100
  },
  {
    title: "出货批次",
    dataIndex: "batch_id",
    width: 100
  },
  {
    title: "固件版本",
    dataIndex: "firmware_version",
    width: 100
  },
  {
    title: "SIM卡套餐",
    dataIndex: ["sim_package", "name"],
    width: 100
  }
]

const searchForm = ref<getOrderDeviceListParams>({
  sns: "",
  customername: "",
  device_type_name: "",
  po: "",
  sim_package_activate_type: "",
  delivery_time_start: "",
  delivery_time_end: ""
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
  console.log(inputValue, option.name)

  return option.name.indexOf(inputValue) > -1
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
            <a-form-item label="福达SN">
              <a-input v-model:value="searchForm.sns"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="标准客户名称">
              <a-select
                v-model:value="searchForm.customername"
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
            <a-form-item label="型号规格">
              <a-select
                v-model:value="searchForm.device_type_name"
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
            <a-form-item label="福达SN">
              <a-input v-model:value="searchForm.sns"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="标准客户名称">
              <a-select
                v-model:value="searchForm.customername"
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
            <a-form-item label="型号规格">
              <a-select
                v-model:value="searchForm.device_type_name"
                show-search
                allowClear
                :options="CodeListStore.codeList['device']"
                :fieldNames="{ label: 'name', value: 'id' }"
                :filter-option="filterCode"
                @change="submit()"
              ></a-select>
            </a-form-item>
          </a-col>

          <a-col :span="16" style="text-align: right">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin-left: 8px" @click="reset">重置</a-button>
            <a-button style="margin-left: 8px; background-color: #28c289; color: white" @click="reset"
              >高级筛选</a-button
            >
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="page-table">
      <pro-table ref="tableRef" :columns="columns" :reqParams="searchForm" :reqApi="getOrderDeviceList">
        <template #bodyCell="{ column, index }">
          <template v-if="column.dataIndex === 'index'">
            <div>{{ index + (tableRef.pageData.pageNo - 1) * 10 + 1 }}</div>
          </template>
          <template v-if="column.dataIndex === 'op'">
            <div class="op-btn">
              <a-button type="link">详情</a-button>
              <a-button type="link">RMA</a-button>
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
