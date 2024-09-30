<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getDevicePackageList, type DevicePackageParams } from "@/api/order"
import { resetFields } from "@/utils"
import { useCodeListStore } from "@/stores/codeList"

const CodeListStore = useCodeListStore()

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    width: 80
  },
  {
    title: "客户套餐名称",
    dataIndex: "name",
    width: 200,
    ellipsis: true
  },
  {
    title: "型号规格",
    dataIndex: ["device_type", "name"],
    width: 200,
    ellipsis: true
    // width: 150
  },
  {
    title: "SIM卡套餐",
    dataIndex: ["sim_package", "name"],
    width: 200,
    ellipsis: true
    // width: 150
  },
  {
    title: "SIM-沉默期",
    dataIndex: "sim_package_wait_days",
    width: 150,
    customRender: ({ value }: any) => {
      return `${value}天`
    }
  },
  {
    title: "云套餐",
    dataIndex: ["cloud_package", "name"],
    width: 250
  },
  {
    title: "云-沉默期",
    dataIndex: "cloud_package_wait_days",
    width: 150,
    customRender: ({ value }: any) => {
      return `${value}天`
    }
  },
  {
    title: "备注",
    //下划线分割
    dataIndex: "remark",
    width: 250,
    ellipsis: true
  },
  {
    title: "操作",
    dataIndex: "op",
    width: 150,
    fixed: "right"
  }
]

const searchForm = ref<DevicePackageParams>({
  name: "",
  device_type_name: "",
  sim_package_id: "",
  cloud_package_id: ""
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
  CodeListStore.getCodeList("customer")
  CodeListStore.getCodeList("device")
  // CodeListStore.getCodeList("simPackage")
  // CodeListStore.getCodeList("cloudPackage")
})
</script>
<template>
  <div class="page-main">
    <div class="page-search">
      <a-form ref="formRef" v-bind="layout" :model="searchForm" @finish="submit">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="客户套餐名称">
              <a-input v-model:value="searchForm.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="型号规格">
              <a-select
                v-model:value="searchForm.device_type_name"
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
            <a-form-item label="云套餐">
              <a-select
                v-model:value="searchForm.cloud_package_id"
                show-search
                :options="CodeListStore.codeList['cloudPackage']"
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
      <pro-table ref="tableRef" :columns="columns" :reqParams="searchForm" :reqApi="getDevicePackageList">
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
