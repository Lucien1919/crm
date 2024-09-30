import { createApp } from "vue"
import { createPinia } from "pinia"
import "ant-design-vue/dist/reset.css"
import "./styles/tailwind.css"
import "./styles/global.less"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount("#app")
