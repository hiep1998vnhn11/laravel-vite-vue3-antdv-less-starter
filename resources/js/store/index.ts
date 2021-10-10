import type { App } from 'vue'
import { createStore } from 'vuex'
import user from './modules/user'
import locale from './modules/locale'
import app from './modules/app'
const store = createStore<any>({
    modules: {
        locale,
        app,
    },
})

export function setupStore(app: App<Element>) {
    app.use(store)
}

export { store }
