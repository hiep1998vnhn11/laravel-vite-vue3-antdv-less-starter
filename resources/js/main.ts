import '/@/design/index.less'
import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter, router } from './router'
import { setupI18n } from '/@/locales/setupI18n'
import { initAppConfigStore } from '/@/logics/initAppConfig'
import { registerGlobComp } from '/@/components/registerGlobComp'
import { setupErrorHandle } from '/@/logics/error-handle'
import { setupGlobDirectives } from '/@/directives'
import { setupRouterGuard } from '/@/router/guard'

import 'ant-design-vue/dist/antd.less'

async function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  initAppConfigStore()
  setupErrorHandle(app)
  setupGlobDirectives(app)
  registerGlobComp(app)
  await setupI18n(app)
  setupRouter(app)
  // setupRouterGuard(router)
  await router.isReady()
  app.mount('#app')
}

void bootstrap()
