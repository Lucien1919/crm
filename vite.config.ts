import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

import { resolve } from "path"
import { createHtmlPlugin } from "vite-plugin-html"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import VitePluginImp from "vite-plugin-imp"
import { visualizer } from "rollup-plugin-visualizer"

const Plugins = [
  vue(),
  vueJsx(),
  createHtmlPlugin({
    minify: true,
    entry: "src/main.ts",
    template: "index.html",
    inject: {
      data: {
        title: "ERP"
      }
    }
  }),
  AutoImport({
    imports: ["vue", "vue-router"],
    dts: "./src/types/auto-imports.d.ts"
  }),
  VitePluginImp({
    optimize: true,
    // 按需引入包
    libList: [
      {
        libName: "lodash",
        libDirectory: "",
        camel2DashComponentName: false,
        style: () => {
          return false
        }
      }
    ]
  }),
  Components({
    resolvers: [
      AntDesignVueResolver({
        importStyle: false // css in js
      })
    ],
    dts: "./src/types/components.d.ts"
  }),
  visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true
  })
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: Plugins,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  build: {
    sourcemap: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    hmr: true,
    port: 9527,
    open: false,
    cors: true,
    host: true,
    // 代理
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true
      }
    }
  },
  // css: {
  //   // css预处理器
  //   preprocessorOptions: {
  //     less: {
  //       charset: false,
  //       additionalData: ["@import '@/styles/global.less';"]
  //     }
  //   }
  // }
})
