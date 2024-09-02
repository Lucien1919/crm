<script lang="ts" setup>
import { RouterLink, RouterView } from "vue-router"
import { theme } from "ant-design-vue"
import { authRoutes, type RowMeta } from "@/router/index"
const themeName = ref<"defaultAlgorithm" | "darkAlgorithm">("defaultAlgorithm")
import { ref } from "vue"
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons-vue"
const selectedKeys2 = ref<string[]>(["1"])
const openKeys = ref<string[]>(["sub1"])

const router = useRouter()
const route = useRoute()
const menuList = ref(authRoutes[0])
const selectedKeys1 = ref<string[]>([menuList.value.children![0].name as string])

const activeHeadMenu = ref(menuList.value.children![0].children![0])
const selectHeadMenu = (item: RowMeta) => {
  activeHeadMenu.value = item
  console.log(activeHeadMenu)
}

onMounted(() => {})
</script>

<template>
  <a-layout style="height: 100vh">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys1" theme="dark" mode="horizontal" :style="{ lineHeight: '48px' }">
        <a-menu-item v-for="item in menuList.children" :key="item.name" @click="selectHeadMenu(item)">
          {{ item.meta.title }}
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="180" style="background: #fff">
        <a-menu
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu v-for="item in activeHeadMenu.children" :key="item.name">
            <template #title>
              <span>·
                <user-outlined />
                subnav 1
              </span>
            </template>
            <a-menu-item v-for="sideItem in item" :key="sideItem.name">{{ item.meta.title }}</a-menu-item>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <laptop-outlined />
                subnav 2
              </span>
            </template>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template #title>
              <span>
                <notification-outlined />
                subnav 3
              </span>
            </template>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 14px 14px">
        <a-breadcrumb style="margin: 12px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
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
