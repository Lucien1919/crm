<template>
  <a-table
    class="self-table"
    :pagination="props.pagination"
    :columns="props.columns"
    :data-source="tableList"
    :loading="loading"
    v-bind="attrs"
  >
    <template v-for="(value, key) in slot" v-slot:[key]="slotProps" :key="key">
      <slot :name="key" v-bind="slotProps"></slot>
    </template>
  </a-table>
  <div class="pagination">
    <a-pagination
      v-if="!props.pagination"
      showSizeChanger
      :defaultPageSize="defaultPageSize"
      :pageSizeOptions="pageSizeOptions"
      v-model:current="pageObj.pageNo"
      v-model:pageSize="pageObj.pageSize"
      :total="pageObj.total"
      :show-total="(total) => `共 ${total} 条`"
      @change="onChange"
      @showSizeChange="showSizeChange"
    >
    </a-pagination>
  </div>
</template>
<script>
export default {
  name: "ProTable",
  inheritAttrs: false
}
</script>
<script setup>
import { message } from "ant-design-vue"
const calcX = columns.reduce((sum, currValue) => sum + currValue.width, 0) + "px"
const props = defineProps({
  columns: {
    type: Array,
    default: []
  },
  getList: {
    type: Function,
    required: true
  },
  requestParams: {
    type: Object
  },
  pagination: {
    type: Boolean,
    default: false
  },
  onDataUpdate: {
    type: Function
  },
  folding: {
    type: Boolean,
    default: true
  },
  scroll: {
    type: Object,
    default: { x: calcX }
  }
})
const emit = defineEmits(["search", "reset"])
const tableList = ref([])
const defaultPageSize = ref(10)
const pageSizeOptions = ["10", "20", "50", "100"]
const attrs = useAttrs()
const slot = useSlots()
const loading = ref(false)
const pageObj = reactive({
  pageNo: 1,
  pageSize: defaultPageSize,
  total: 0,
  requestType: "1" // 1查询   0重置
})

// 列表请求
const requestList = async () => {
  if (loading.value) return
  loading.value = true
  const { data, code, msg } = await props
    .getList?.({
      page: pageObj.pageNo,
      limt: pageObj.pageSize,
      ...props.requestParams
    })
    .catch((res) => {
      // debugger
      loading.value = false
    })
  loading.value = false
  if (code !== 0) return message.error(msg)
  pageObj.total = data.total
  if (props?.onDataUpdate) {
    tableList.value = props?.onDataUpdate?.(data.list) ?? []
  } else {
    tableList.value = data?.list ?? []
  }
}
const search = (type) => {
  pageObj.pageNo = 1
  pageObj.requestType = type
  pageObj.pageSize = defaultPageSize
  requestList()
}

// 分页相关
const onChange = (pageNo) => {
  pageObj.pageNo = pageNo
  requestList()
}
const showSizeChange = (pageNo, pageSize) => {
  Object.assign(pageObj, {
    pageNo: 1,
    pageSize
  })
}
onMounted(() => {
  requestList()
})
defineExpose({
  refresh: search(1)
})
</script>
<style lang="less" scoped>
.self-table {
  height: 100%;
  margin-top: 10px;
}

.pagination {
  margin-top: 10px;
  text-align: right;
}

.search-btn {
  margin-top: 10px;
}
</style>
