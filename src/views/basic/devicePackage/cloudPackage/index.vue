<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getCloudPackageList } from "@/api/order"
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
    dataIndex: "name",
    width: 200,
    ellipsis: true
  },
  {
    title: "流量",
    dataIndex: "traffic",
    width: 200,
    ellipsis: true,
    customRender: ({ record, value }: any) => {
      const traffic = record.traffic
      const traffic_unit = record.traffic_unit == 1 ? "MB/月" : "GB/月"
      return value ? `${traffic} ${traffic_unit}` : "--"
    }
  },
  {
    title: "空间",
    dataIndex: "storage",
    width: 200,
    ellipsis: true,
    customRender: ({ record, value }: any) => {
      const storage = record.storage
      const storage_unit = record.storage_unit == 1 ? "MB/月" : "GB/月"
      return value ? `${storage} ${storage_unit}` : "--"
    }
  },
  {
    title: "子系统",
    dataIndex: "subsystem",
    width: 150
  },
  {
    title: "价格",
    dataIndex: "price",
    width: 250,
    customRender: ({ record }: any) => {
      const price = record.price
      const price_currency = record.price_currency == 1 ? "人民币" : "美元"
      const customer_tax = record.customer_tax == 1 ? "含税" : "不含税"
      return price ? `${price} ${price_currency} ${customer_tax}` : "--"
    }
  },
  {
    title: "境内续费价格/每年",
    dataIndex: "domestic_renewal_price",
    width: 250,
    customRender: ({ record }: any) => {
      const price = record.domestic_renewal_price
      const price_currency = record.domestic_renewal_price_currency == 1 ? "人民币" : "美元"
      const tax = record.domestic_renewal_customer_tax == 1 ? "含税" : "不含税"
      return price ? `${price} ${price_currency} ${tax}` : "--"
    }
  },
  {
    title: "境外续费价格/每年",
    //下划线分割
    dataIndex: "international_renewal_price",
    width: 250,
    ellipsis: true,
    customRender: ({ record }: any) => {
      const price = record.international_renewal_price
      const price_currency = record.international_renewal_price_currency == 1 ? "人民币" : "美元"
      return price ? `${price} ${price_currency}` : "--"
    }
  },
  {
    title: "有效期",
    dataIndex: "duration",
    width: 150,
    customRender: ({ record }: any) => {
      const duration = record.duration
      const duration_unit = record.duration_unit == 1 ? "月" : "年"
      return duration ? `${duration} ${duration_unit}` : "--"
    }
  },
  {
    title: "单月",
    dataIndex: "cost",
    width: 150,
    customRender: ({ record }: any) => {
      const cost = record.cost
      const cost_currency = record.cost_currency == 1 ? "月" : "年"
      return cost ? `${cost} ${cost_currency}` : "--"
    }
  },
  {
    title: "毛利率",
    dataIndex: "gross_margin",
    width: 200,
    customRender: ({ value }: any) => {
      return value ? `${value}%` : "--"
    }
  },
  {
    title: "操作",
    dataIndex: "op",
    width: 250,
    fixed: "right"
  }
]

const searchForm = ref<{ name: string }>({
  name: ""
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
          <a-col :span="8" style="text-align: right">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin-left: 8px" @click="reset">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="page-table">
      <pro-table ref="tableRef" :columns="columns" :reqParams="searchForm" :reqApi="getCloudPackageList">
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
