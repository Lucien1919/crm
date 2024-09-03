<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import useLoading from "./components/useLoading.vue"
import { theme } from "ant-design-vue"

const themeName = ref<"defaultAlgorithm" | "darkAlgorithm">("defaultAlgorithm")
</script>

<template>
  <a-config-provider
    :theme="{
      algorithm: theme[themeName]
    }"
    :dropdownMatchSelectWidth="false"
    componentSize="large"
  >
    <use-loading></use-loading>
    <router-view></router-view>
  </a-config-provider>
</template>

<style lang="less" scoped></style>
