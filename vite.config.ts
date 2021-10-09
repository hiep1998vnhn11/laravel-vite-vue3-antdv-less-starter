import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { resolve } from 'path'

function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: true,
        port: 9001,
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
                replacement: pathResolve('resources/js/types') + '/',
            },
        ],
    },
    build: {
        outDir: 'public',
        rollupOptions: {
            input: 'resources/js/main.ts',
        },
        chunkSizeWarningLimit: 2000,
        manifest: true,
        emptyOutDir: false,
    },
    plugins: [vue(), vueJsx()],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                additionalData: ` @import '/@/design/variable.less';`,
            },
        },
    },
})
