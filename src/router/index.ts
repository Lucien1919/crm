import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router"
import layout from "@/views/layout/index.vue"
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
    beforeEnter: (to, from, next) => {},
    component: () => {}
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

// router.beforeEach(async (to, from, next) => {
//   window.$loading.start()
//   const token = getToken()

//   if (whiteNames.includes(to.name as string)) {
//     return next()
//   }
//   if (!token || !userInfo) {
//     return next("/login")
//   }

//   next()
// })

// router.afterEach((to) => {
//   // window.$loading.finish()
//   document.title = `${to.meta.title}`
// })

export default router
