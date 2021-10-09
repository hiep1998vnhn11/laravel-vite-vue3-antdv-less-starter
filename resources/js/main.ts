import '/@/design/index.less'
import '/@/design/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router/test'
import 'ant-design-vue/dist/antd.less'

async function bootstrap() {
    const app = createApp(App)
    setupStore(app)
    setupRouter(app)
    app.mount('#app')
}

void bootstrap()
