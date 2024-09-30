<script setup lang="ts">
import type { ColumnsType, TablePaginationConfig } from "ant-design-vue/es/table/interface"
import { useElementSize } from "@vueuse/core"

const props = defineProps({
  columns: {
    type: Array<any>,
    default: Array<any>()
  },
  reqApi: {
    type: Function,
    required: true
  },
  reqParams: {
    type: Object,
    required: true,
    default: () => ({})
  },
  isImmediate: {
    type: Boolean,
    default: true
  },
  formatTableFun: {
    type: Function
  },

  pagination: {
    type: Boolean,
    default: false
  },

  folding: {
    type: Boolean,
    default: true
  }
  // scroll: {
  //   type: Object
  // }
})

const tableRef = ref()
const defaultPageSize = ref(10)
const pageSizeOptions = ["10", "20", "50", "100"]
const attrs = useAttrs()
const slot = useSlots()
const pageData = ref({
  pageNo: 1,
  pageSize: defaultPageSize.value,
  total: 0
})

const antPagination = computed(() => {
  return {
    total: pageData.value.total,
    current: pageData.value.pageNo,
    pageSize: pageData.value.pageSize,
    pageSizeOptions,
    showQuickJumper: true,
    size: "default",
    showTotal: (total: number) => `共${total}条`
  } as TablePaginationConfig
})

const tableData = ref([])
const originData = ref([])
const loading = ref(false)

const tabeChange = (pagination: any, filters: any, sorter: any, { action, currentDataSource }: any) => {
  console.log("changeData", action)
  pageData.value.pageNo = pagination.current
  pageData.value.pageSize = pagination.pageSize
  loadData()
}

const loadData = async () => {
  if (loading.value) return
  try {
    const params = { ...props.reqParams }
    Object.keys(params).map((key) => {
      if (params[key] == "" || params[key] == null) {
        delete params[key]
      }
    })
    delete params.date
    loading.value = true
    const { data } = await props.reqApi({
      page: pageData.value.pageNo,
      limit: pageData.value.pageSize,
      ...params
    })
    if (!data || data.list.length < 0) {
      tableData.value = []
      return
    }
    originData.value = data.list || []
    tableData.value = props.formatTableFun ? props.formatTableFun(data.list) : data.list
    pageData.value.total = data.total
  } finally {
    loading.value = false
  }
}
//查询
const doQuery = () => {
  pageData.value.pageNo = 1
  // pageData.value.pageSize = defaultPageSize.value
  loadData()
}
//刷新
const doRefresh = () => {
  doQuery()
}

defineExpose({ doQuery, tableData, pageData })
const scroll = ref()
onMounted(() => {
  if (!props.isImmediate) {
    return
  }
  doQuery()
  nextTick(() => {
    const { width, height } = useElementSize(tableRef)
    scroll.value = { x: unref(width) - 60, y: unref(height) - 120 }
  })
  // window.addEventListener("resize", () => {
  //   const { width, height } = useElementSize(tableRef)
  //   scroll.value = { x: unref(width), y: unref(height) - 120 }
  // })
})
</script>

<template>
  <a-table
    ref="tableRef"
    :pagination="antPagination"
    :columns="props.columns"
    :data-source="tableData"
    :loading="loading"
    size="middle"
    :scroll="scroll"
    v-bind="attrs"
    @change="tabeChange"
    :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : '')"
    bordered
  >
    <template v-for="(value, key) in slot" v-slot:[key]="slotProps" :key="key">
      <slot :name="key" v-bind="slotProps"></slot>
    </template>
  </a-table>
</template>

<style lang="less" scoped>
// :deep(.ant-table-cell) {
//   font-size: 16px;
:deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
