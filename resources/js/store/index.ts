import type { App } from 'vue'
import { createStore } from 'vuex'
import user from './modules/user'
import locale from './modules/locale'
import app from './modules/app'
import lock from './modules/lock'
import permission from './modules/permission'
import errorLog from './modules/errorLog'
import multipleTab from './modules/multipleTab'
const store = createStore<any>({
  modules: {
    locale,
    app,
    user,
    lock,
    permission,
    errorLog,
    multipleTab,
  },
})

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
