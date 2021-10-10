import '/@/design/index.less'
import '/@/design/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import { setupI18n } from '/@/locales/setupI18n'
import { initAppConfigStore } from '/@/logics/initAppConfig'
import { registerGlobComp } from '/@/components/registerGlobComp'

import 'ant-design-vue/dist/antd.less'

async function bootstrap() {
    const app = createApp(App)
    setupStore(app)
    initAppConfigStore()
    registerGlobComp(app)
    setupRouter(app)
    await setupI18n(app)
    app.mount('#app')
}

void bootstrap()
