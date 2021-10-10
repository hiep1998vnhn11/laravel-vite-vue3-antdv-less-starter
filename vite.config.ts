import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configThemePlugin } from './build/vite/plugin/theme'
import { configHtmlPlugin } from './build/vite/plugin/html'
import { configSvgIconsPlugin } from './build/vite/plugin/svgSprite'
import { wrapperEnv } from './build/utils'
import moment from 'moment'
import pkg from './package.json'
import { generateModifyVars } from './build/generate/generateModifyVars'

import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const { dependencies, devDependencies, version } = pkg
  const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, version },
    lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss'),
  }
  const isBuild = command === 'build'
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv
  return defineConfig({
    base: VITE_PUBLIC_PATH,
    root,
    server: {
      host: true,
      port: VITE_PORT,
    },
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: /\/@\//,
          replacement: pathResolve('resources/js') + '/',
        },
        {
          find: /\/#\//,
          replacement: pathResolve('resources/types') + '/',
        },
      ],
    },
    build: {
      target: 'es2015',
      outDir: 'public',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      rollupOptions: {
        input: 'resources/js/main.ts',
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      manifest: true,
      emptyOutDir: false,
    },
    plugins: [
      vue(),
      vueJsx(),
      configThemePlugin(isBuild),
      configHtmlPlugin(viteEnv, isBuild),
      configSvgIconsPlugin(isBuild),
    ],
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: generateModifyVars(),
        },
      },
    },
    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'moment/dist/locale/zh-cn',
        'ant-design-vue/es/locale/en_US',
        'moment/dist/locale/eu',
      ],
      exclude: ['vue-demi'],
    },
  })
}
