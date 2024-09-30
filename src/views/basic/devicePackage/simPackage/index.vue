<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getSimPackageList, type SimPackageParams } from "@/api/order"
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
    title: "套餐名称",
    dataIndex: "id",
    width: 200,
    ellipsis: true
  },
  {
    title: "国家",
    dataIndex: "country",
    width: 200,
    ellipsis: true
  },
  {
    title: "运营商",
    dataIndex: "sim_company",
    width: 200,
    ellipsis: true
  },
  {
    title: "流量池",
    dataIndex: "sim_pool",
    width: 150,
    customRender: ({ value }: any) => {
      return value ? value : "--"
    }
  },
  {
    title: "价格",
    dataIndex: "price",
    width: 250,
    customRender: ({ record }: any) => {
      const price = record.price
      const currency = record.price_currency == 1 ? "人民币" : "美元"
      const customer_tax = record.customer_tax == 0 ? "含税" : "不含税"
      return `${price} ${currency} ${customer_tax}`
    }
  },
  {
    title: "有效期",
    dataIndex: "duration",
    width: 250,
    customRender: ({ record }: any) => {
      const duration = record.duration
      const duration_unit_type = record.duration_unit_type == 1 ? "月" : "年"
      return `${duration} ${duration_unit_type} `
    }
  },
  {
    title: "流量",
    dataIndex: "traffic",
    width: 250,
    customRender: ({ record, value }: any) => {
      const traffic = record.traffic
      const traffic_unit = record.traffic_unit == 1 ? "MB/月" : "GB/月"
      return value ? `${traffic} ${traffic_unit}` : "--"
    }
  },
  {
    title: "每月流量阈值",
    dataIndex: "traffic_threshold",
    width: 150,
    customRender: ({ value }: any) => {
      return `${value}MB/月 `
    }
  },
  {
    title: "频段",
    dataIndex: "frequency_band",
    width: 150
  },
  {
    title: "成本已录",
    dataIndex: "cost_count",
    width: 200,
    customRender: ({ value }: any) => {
      return value > 0 ? "Y" : " -- "
    }
  },
  {
    title: "操作",
    dataIndex: "op",
    width: 260,
    fixed: "right"
  }
]

const searchForm = ref<SimPackageParams>({
  name: "",
  sim_company: ""
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
})
</script>
<template>
  <div class="page-main">
    <div class="page-search">
      <a-form ref="formRef" v-bind="layout" :model="searchForm" @finish="submit">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="套餐名称">
              <a-input v-model:value="searchForm.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="运营商">
              <a-select
                v-model:value="searchForm.sim_company"
                show-search
                :options="CodeListStore.codeList['deliveryState']"
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
      <pro-table ref="tableRef" :columns="columns" :reqParams="searchForm" :reqApi="getSimPackageList">
        <template #bodyCell="{ column, index }">
          <template v-if="column.dataIndex === 'index'">
            <div>{{ index + (tableRef.pageData.pageNo - 1) * 10 + 1 }}</div>
          </template>
          <template v-if="column.dataIndex === 'op'">
            <div class="op-btn">
              <a-button type="link">编辑</a-button>
              <a-button type="link">成本</a-button>
              <a-button type="link">价格</a-button>
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
