<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getOrderList, type OrderParams } from "@/api/order"
import { resetFields, formatObj } from "@/utils"
import { useCodeListStore } from "@/stores/codeList"
import { columns } from "./deviceOrder"

const CodeListStore = useCodeListStore()
CodeListStore.getCodeList("customer")
CodeListStore.getCodeList("device")

const searchForm = ref<OrderParams>({
  customer: "",
  device_type_id: "",
  delivery_state: "",
  po: "",
  date: ["", ""],
  order_time_start: "",
  order_time_end: ""
})
const layout = {
  labelCol: { style: { width: "120px" } }
  // wrapperCol: { span: 20 }
}

const dateChange = (date: any) => {
  if (date && date.length > 1) {
    searchForm.value.order_time_start = date[0].format("YYYY-MM-DD")
    searchForm.value.order_time_end = date[1].format("YYYY-MM-DD")
  } else {
    searchForm.value.order_time_start = ""
    searchForm.value.order_time_end = ""
  }
  submit()
}

const originData = ref()
//尽量保持原字段
const formatTableFun = (tableData: any) => {
  const list = [] as any
  originData.value = tableData
  tableData.map((rowDara: any) => {
    const row = {
      po: rowDara.po, //销售合同编号
      customName: rowDara.customer.name, //客户名称
      devCount: rowDara.device_count, //下单总数
      files: rowDara.attach_file, //附件
      orderTime: rowDara.order_time.slice(0, 11), //合同签订日期
      userId: rowDara.user_id, //客户经理
      deliveryType: rowDara.delivery_type.name, //订单类型
      status: rowDara.status, //订单状态
      array: [] as any
    }

    rowDara.order_device_types.map((item: any) => {
      const currency = item.currency_type == 1 ? "人民币" : "美元"
      row.array.push({
        deviceType: item.device_type_name, //型号规格
        unitPrice: item.unit_price, //销售不含税价
        taxRate: `${item.unit_price} ${currency} (${item.tax_rate}%)`, //销售含税价
        deliverDevCount: item.delivered_device_count, //已出货
        deviceCount: item.device_count //下单总数
      })
    })

    list.push(formatObj(row))
  })
  return list
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
</script>
<template>
  <div class="page-main">
    <div class="page-search">
      <a-form ref="formRef" v-bind="layout" :model="searchForm" @finish="submit">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="销售合同编号">
              <a-input v-model:value="searchForm.po"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="标准客户名称">
              <a-select
                v-model:value="searchForm.customer"
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
                v-model:value="searchForm.device_type_id"
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
            <a-form-item label="出货状态">
              <a-select
                v-model:value="searchForm.delivery_state"
                show-search
                :options="CodeListStore.codeList['deliveryState']"
                :fieldNames="{ label: 'name', value: 'id' }"
                :filter-option="filterCode"
                @change="submit()"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同签订日期">
              <a-range-picker style="width: 100%" v-model:value="searchForm.date" @change="dateChange" />
            </a-form-item>
          </a-col>
          <a-col :span="8" style="text-align: right">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin-left: 8px" @click="reset" html-type="submit">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="page-table">
      <pro-table
        ref="tableRef"
        :columns="columns"
        :reqParams="searchForm"
        :reqApi="getOrderList"
        :formatTableFun="formatTableFun"
      >
        <template #headerCell="{ column }">
          <template v-if="column.dataIndex === 'deviceCount'">
            <div>下单总数<span class="tag-1">已出货</span> <span class="tag-2">未出货</span></div>
          </template>
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'index'">
            <div>{{ index + (tableRef.pageData.pageNo - 1) * 10 + 1 }}</div>
          </template>

          <!-- 嵌套 -->
          <template v-if="['deviceType', 'unitPrice', 'taxRate'].includes(column.dataIndex)">
            <div class="nesting-cell">
              <div v-for="(item, index) in record.array" :key="index">{{ item[column.dataIndex] }}</div>
            </div>
          </template>
          <template v-if="column.dataIndex === 'files'">
            <div class="nesting-cell">
              <div v-for="(item, index) in text.split(',')" :key="index">
                <a :href="fileUrl(item)" target="_blank">{{ item.split("_")[1].slice(0, 20) + "..." }}</a>
              </div>
            </div>
          </template>
          <!--  -->

          <template v-if="column.dataIndex === 'status'">
            <div style="display: flex; justify-content: flex-start">
              <a-button type="link">{{ text === 0 || text === 2 ? "未开票" : "开票" }}</a-button>
              <a-button type="link">{{ text === 0 || text === 1 ? "未收款" : "收款" }}</a-button>
            </div>
          </template>
          <template v-if="column.dataIndex === 'op'">
            <div class="op-btn">
              <a-button type="link">出货</a-button>
              <a-button type="link">编辑</a-button>
              <a-button type="link" v-if="record.array[0].deliverDevCount == 0">删除</a-button>
              <a-button type="link" v-else>出货记录</a-button>
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
