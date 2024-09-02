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
              }
            ]
          },
          {
            path: "shipRegist",
            name: "shipRegist",
            redirect: "/order/salesOrder/device",
            meta: { title: "出货登记", roles: ["admin", "dealer", "end_user"] },
            children: [
              {
                path: "device",
                name: "device",
                meta: { title: "设备", roles: ["admin", "dealer", "end_user"] },
                component: () => import("@/views/order/shipRegist/device/index.vue")
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

  //可能还需要加入userinfo校验
  if (!getCookie("gfsessionid")) {
    return next("/login")
  }

  next()
})

router.afterEach((to) => {
  window.$loading.finish()
  document.title = `${to.meta.title}`
})

export default router
