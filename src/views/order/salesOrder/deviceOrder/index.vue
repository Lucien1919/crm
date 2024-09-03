<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue"

const props = defineProps({
  id: {
    type: String,
    default: ""
  }
})

onMounted(() => {
  //
})
</script>
<template>
  <div>设备订单</div>
</template>
<style lang="scss" scoped></style>
