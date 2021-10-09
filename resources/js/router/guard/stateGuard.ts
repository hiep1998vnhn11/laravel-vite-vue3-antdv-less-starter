import type { Router } from 'vue-router'
import { store } from '/@/store'
import { PageEnum } from '/@/enums/pageEnum'
import { removeTabChangeListener } from '/@/logics/mitt/routeChange'

export function createStateGuard(router: Router) {
    router.afterEach((to) => {
        if (to.path === PageEnum.BASE_LOGIN) {
            store.commit('app/RESET_STATE')
            store.commit('permission/RESET_STATE')
            store.commit('multipleTab/RESET_STATE')
            store.commit('user/RESET_STATE')
            removeTabChangeListener()
        }
    })
}
