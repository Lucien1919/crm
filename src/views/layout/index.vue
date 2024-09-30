<script lang="ts" setup>
import { RouterLink, RouterView } from "vue-router"
// import theme from "ant-design-vue/es/theme"
import { authRoutes, type RowMeta } from "@/router/index"
const themeName = ref<"defaultAlgorithm" | "darkAlgorithm">("defaultAlgorithm")
import { ref } from "vue"

const router = useRouter()
const route = useRoute()

const breadList = computed(() => {
  return route.matched.slice(1, route.matched.length)
})

const topMenuList = ref(authRoutes[0].children)
const sideMenuList = ref()

const selectTopMenu = ref<string[]>()
const selectSideMenu = ref<string[]>()

const activeRouteName = computed({
  get: () => {
    return [route.name]
  },
  set: (v) => {
    const result = router.getRoutes().find((item) => item.name == v[0])
    router.push({ ...result })
  }
}) as Ref<string[]>
const chooseTopMenu = (item: RowMeta) => {
  sideMenuList.value = item.children
  selectSideMenu.value = [sideMenuList.value![0].name as string]
  router.push(item.path)
}

onMounted(() => {
  topMenuList.value?.map((item) => {
    if (route.path.includes(item.path)) {
      selectTopMenu.value = [item.name as string]
      sideMenuList.value = item.children
    }
  })

  sideMenuList.value?.map((item: any) => {
    if (route.path.includes(item.path)) {
      selectSideMenu.value = [item.name as string]
    }
  })
})
</script>

<template>
  <a-layout style="height: 100vh">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectTopMenu" theme="dark" mode="horizontal" :style="{ lineHeight: '48px' }">
        <a-menu-item v-for="item in topMenuList" :key="item.name" @click="chooseTopMenu(item)">
          {{ item.meta.title }}
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="180" style="background: #fff">
        <a-menu
          v-model:selectedKeys="activeRouteName"
          v-model:openKeys="selectSideMenu"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu v-for="subItem in sideMenuList" :key="subItem.name">
            <template #title>
              <span> {{ subItem.meta.title }} </span>
            </template>
            <a-menu-item v-for="menuItem in subItem.children" :key="menuItem.name">
              {{ menuItem.meta.title }}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 14px 14px">
        <a-breadcrumb style="margin: 12px 0">
          <a-breadcrumb-item v-for="item of breadList">
            <router-link :to="item"> {{ item.meta.title }} </router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content :style="{ margin: 0 }">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.header {
  height: 48px;
}
</style>
