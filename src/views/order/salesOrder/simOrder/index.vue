<script lang="ts" setup>
import { computed, customRef, onMounted, reactive, ref, toRefs } from "vue"
import proTable from "@/components/proTable.vue"
import { getSimOrderList, type SimParams } from "@/api/order"
import { resetFields, formatObj } from "@/utils"
import { useCodeListStore } from "@/stores/codeList"
import { columns } from "./simOrder"
const CodeListStore = useCodeListStore()

const searchForm = ref<SimParams>({
  customer: "",
  po: ""
})
const layout = {
  labelCol: { style: { width: "120px" } }
  // wrapperCol: { span: 20 }
}

//尽量保持原字段
const formatTableFun = (tableData: any) => {
  const list = [] as any
  tableData.map((rowDara: any) => {
    const row = {
      po: rowDara.po, //销售合同编号
      orderTime: rowDara.order_time.slice(0, 11), //合同签订日期
      factoryCode: rowDara.customer_factory_code == "null" ? "--" : rowDara.customer_factory_code, //厂区编码
      customName: rowDara.customer.name, //标准客户名称
      contact: rowDara.customer_contact, //客户名称
      deliveryType: rowDara.delivery_type_name, //收款条件
      files: rowDara.attach_file, //附件
      status: rowDara.status, //订单状态
      array: [] as any
    }

    rowDara.order_sim_types.map((item: any) => {
      const currency = item.currency_type == 1 ? "人民币" : "美元"
      row.array.push({
        simName: item.sim_package_name, //SIM卡套餐
        simCount: item.sim_count, //SIM卡套餐
        deliveredSimCount: item.delivered_sim_count, //已出货数量
        unitPrice: `${item.unit_price}${currency}` //销售单价
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
onMounted(() => {
  CodeListStore.getCodeList("customer")
})
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
        :reqApi="getSimOrderList"
        :formatTableFun="formatTableFun"
      >
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'index'">
            <div>{{ index + (tableRef.pageData.pageNo - 1) * 10 + 1 }}</div>
          </template>

          <!-- 嵌套 -->
          <template v-if="['simName', 'simCount', 'deliveredSimCount', 'unitPrice'].includes(column.dataIndex)">
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
            <div class="op-btn">
              <a-button type="link">{{ text === 0 || text === 2 ? "未开票" : "开票" }}</a-button>
              <a-button type="link">{{ text === 0 || text === 1 ? "未收款" : "收款" }}</a-button>
            </div>
          </template>
          <template v-if="column.dataIndex === 'op'">
            <div class="op-btn">
              <a-button type="link">发货</a-button>
              <a-button type="link">编辑</a-button>
              <a-button type="link">出货记录</a-button>
              <a-button type="link" v-if="record.array[0].deliveredSimCount == 0">删除</a-button>
            </div>
          </template>
        </template>
      </pro-table>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
