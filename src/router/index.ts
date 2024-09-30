import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router"
import layout from "@/views/layout/index.vue"
import { getCookie } from "@/utils/index"
export type role = "admin" | "dealer" | "end_user"

export type RowMeta = {
  meta: {
    title: string
    roles: Array<role>
    hidden?: boolean
    icon?: string
  }
  children?: Array<RowMeta>
} & RouteRecordRaw

export const whiteRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    meta: { title: "登陆" },
    // beforeEnter: (to, from, next) => {},
    component: () => import("@/views/login/index.vue")
  }
]

export const authRoutes: Array<RowMeta> = [
  {
    path: "/",
    name: "index",
    component: layout,
    redirect: "/order",
    meta: { title: "", roles: ["admin", "dealer", "end_user"] },
    children: [
      {
        path: "/order",
        name: "order",
        redirect: "/order/salesOrder",
        meta: { title: "订单", roles: ["admin", "dealer", "end_user"] },
        children: [
          {
            path: "salesOrder",
            name: "salesOrder",
            redirect: "/order/salesOrder/deviceOrder",
            meta: { title: "销售订单", roles: ["admin", "dealer", "end_user"] },
            children: [
              {
                path: "deviceOrder",
                name: "deviceOrder",
                meta: { title: "设备订单", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/order/salesOrder/deviceOrder/index.vue")
              },
              {
                path: "simOrder",
                name: "simOrder",
                meta: { title: "SIM卡订单", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/order/salesOrder/simOrder/index.vue")
              },
              {
                path: "renewOrder",
                name: "renewOrder",
                meta: { title: "套餐订单", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/order/salesOrder/renewOrder/index.vue")
              }
            ]
          },
          {
            path: "shipRegist",
            name: "shipRegist",
            redirect: "/order/shipRegist/device",
            meta: { title: "出货登记", roles: ["admin", "dealer", "end_user"] },
            children: [
              {
                path: "device",
                name: "device",
                meta: { title: "设备", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/order/shipRegist/device/index.vue")
              },
              {
                path: "sim",
                name: "sim",
                meta: { title: "SIM卡", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/order/shipRegist/singleSim/index.vue")
              },
              {
                path: "reviewdetail",
                name: "reviewdetail",
                meta: { title: "续费套餐", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/order/shipRegist/reviewDetail/index.vue")
              },
              {
                path: "reviewchange",
                name: "reviewchange",
                meta: { title: "变更套餐", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/order/shipRegist/reviewChange/index.vue")
              }
            ]
          },
          {
            path: "approval",
            name: "approval",
            redirect: "/order/approval/review",
            meta: { title: "审批", roles: ["admin", "dealer", "end_user"] },
            children: [
              {
                path: "review",
                name: "review",
                meta: { title: "待我审批", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/order/approval/review/index.vue")
              },
              {
                path: "myReview",
                name: "myReview",
                meta: { title: "我的审批", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/order/approval/myReview/index.vue")
              }
            ]
          }
        ]
      },
      {
        path: "/basic",
        name: "basic",
        redirect: "/basic/customer",
        meta: { title: "基础", roles: ["admin", "dealer", "end_user"] },
        children: [
          {
            path: "customer",
            name: "customer",
            redirect: "/basic/customer/customers",
            meta: { title: "客户", roles: ["admin", "dealer", "end_user"] },
            children: [
              {
                path: "customers",
                name: "customers",
                meta: { title: "客户管理", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/basic/customer/customers/index.vue")
              },
              {
                path: "pn",
                name: "pn",
                meta: { title: "PN管理", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/basic/customer/pn/index.vue")
              }
            ]
          },
          {
            path: "products",
            name: "products",
            redirect: "/basic/products/deviceType",
            meta: { title: "产品", roles: ["admin", "dealer", "end_user"] },
            children: [
              {
                path: "deviceType",
                name: "deviceType",
                meta: { title: "型号规格", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/basic/products/deviceType/index.vue")
              }
            ]
          },
          {
            path: "devicePackage",
            name: "devicePackage",
            redirect: "/basic/devicePackage/deviceType",
            meta: { title: "套餐服务", roles: ["admin", "dealer", "end_user"] },
            children: [
              {
                path: "devicePackages",
                name: "devicePackages",
                meta: { title: "设备套餐", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/basic/devicePackage/devicePackages/index.vue")
              },
              {
                path: "simPackage",
                name: "simPackage",
                meta: { title: "SIM卡流量", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/basic/devicePackage/simPackage/index.vue")
              },
              {
                path: "cloudPackage",
                name: "cloudPackage",
                meta: { title: "云服务", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/basic/devicePackage/cloudPackage/index.vue")
              }
            ]
          }
        ]
      },
      {
        path: "/statistics",
        name: "statistics",
        redirect: "/statistics/summary",
        meta: { title: "统计", roles: ["admin", "dealer", "end_user"] },
        children: [
          {
            path: "summary",
            name: "summary",
            redirect: "/statistics/summary/devices",
            meta: { title: "汇总", roles: ["admin", "dealer", "end_user"] },
            children: [
              {
                path: "devices",
                name: "devices",
                meta: { title: "设备", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/statistics/summary/devices/index.vue")
              },
              {
                path: "sim",
                name: "sim",
                meta: { title: "SIM卡", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/statistics/summary/sim/index.vue")
              }
            ]
          },
          {
            path: "report",
            name: "report",
            redirect: "/statistics/report/activated-sim",
            meta: { title: "暂用文本", roles: ["admin", "dealer", "end_user"] },
            children: [
              {
                path: "activated-sim",
                name: "activated-sim",
                meta: { title: "月激活设备", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/basic/devicePackage/devicePackages/index.vue")
              },
              {
                path: "simPackage",
                name: "simPackage",
                meta: { title: "SIM卡流量", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/basic/devicePackage/simPackage/index.vue")
              },
              {
                path: "cloudPackage",
                name: "cloudPackage",
                meta: { title: "云服务", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/basic/devicePackage/cloudPackage/index.vue")
              }
            ]
          }
        ]
      }
    ]
  }
]

export const errRoute: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "notfound",
  redirect: "/",
  meta: { title: "404" }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...whiteRoutes, ...authRoutes, errRoute]
})

const whiteNames = whiteRoutes.map((item) => item.name)

router.beforeEach(async (to, from, next) => {
  window.$loading.start()

  if (whiteNames.includes(to.name as string)) {
    return next()
  }

  // 可能还需要加入userinfo校验
  if (!getCookie("gfsessionid")) {
    debugger
    return next("/login")
  }

  next()
})

router.afterEach((to) => {
  window.$loading.finish()
  document.title = `${to.meta.title}`
})

export default router
