import type { App } from 'vue'
import { createStore } from 'vuex'
const store = createStore<any>({
    state: () => ({
        count: 1,
    }),
})

export function setupStore(app: App<Element>) {
    app.use(store)
}

export { store }
