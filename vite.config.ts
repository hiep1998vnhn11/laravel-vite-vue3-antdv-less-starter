import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'public',
        rollupOptions: {
            input: 'resources/js/main.ts',
        },
        chunkSizeWarningLimit: 2000,
        manifest: true,
        emptyOutDir: false,
    },
    plugins: [vue()],
})
