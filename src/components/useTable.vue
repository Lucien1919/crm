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
      v-model:current="pageObj.pageIndex"
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
import { configObj } from "@/config"
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
  }),
  emit = defineEmits(["search", "reset"]),
  tableList = ref([]),
  defaultPageSize = ref(10),
  pageSizeOptions = ["10", "20", "50", "100"],
  attrs = useAttrs(),
  slot = useSlots(),
  folding = ref(props.folding),
  loading = ref(false),
  pageObj = reactive({
    pageIndex: 1,
    pageSize: defaultPageSize,
    total: 0,
    requestType: "1" // 1查询   0重置
  })

const Zhankai = defineComponent(() => {
  const foldingFn = () => (folding.value = !folding.value)
  return () =>
    folding.value ? (
      <span style={{ color: "red", cursor: "pointer" }} onClick={foldingFn}>
        展开
      </span>
    ) : (
      <span style={{ color: "red", cursor: "pointer" }} onClick={foldingFn}>
        收起
      </span>
    )
})

// 列表请求
const requestList = async () => {
    if (loading.value) return
    loading.value = true
    const { Success, Message, Data } = await props?.getList?.(pageObj).catch((res) => {
      // debugger
      loading.value = false
    })
    loading.value = false
    if (!Success) return message.error(Message)
    pageObj.total = Data.TotalCount
    if (props?.onDataUpdate) tableList.value = props?.onDataUpdate?.(Data.Data) ?? []
    else tableList.value = Data?.Data ?? []
  },
  search = (type) => {
    pageObj.pageIndex = 1
    pageObj.requestType = type
    pageObj.pageSize = defaultPageSize
    requestList()
  }

// 分页相关
const onChange = (pageIndex) => {
    pageObj.pageIndex = pageIndex
    requestList()
  },
  showSizeChange = (pageIndex, pageSize) => {
    Object.assign(pageObj, {
      pageIndex: 1,
      pageSize
    })
  }
const ifShowCard = computed(() => slot?.formSearch?.().length && slot?.btnOption?.().length)
onMounted(() => {
  requestList()
})
defineExpose({
  refresh: search(1)
})
</script>
<style lang="less" scoped>
.self-table {
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
