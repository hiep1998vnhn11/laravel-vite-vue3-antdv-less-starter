import type { Router, RouteRecordRaw } from 'vue-router'

import { PageEnum } from '/@/enums/pageEnum'
import { store } from '/@/store'

import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'
import { PermissionRoute } from '../routes'

const LOGIN_PATH = PageEnum.BASE_LOGIN

const whitePathList: PageEnum[] = [LOGIN_PATH, PageEnum.PERMISSION]

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const env = to.query.env?.toString()
    const envStorage = localStorage.getItem('env')
    if (env && env !== envStorage) {
      localStorage.setItem('env', env)
      window.location.reload()
    }
    if (from.path === LOGIN_PATH && to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next(PageEnum.BASE_HOME)
      return
    }
    if (whitePathList.includes(to.path as PageEnum)) {
      next()
      return
    }

    const token = store.getters['user/getToken']

    if (!token) {
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      const redirectData: {
        path: string
        replace: boolean
        query?: Recordable<string>
      } = {
        path: LOGIN_PATH,
        replace: true,
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
      }
      next(redirectData)
      return
    }
    if (!store.state.user.userInfo) await store.dispatch('user/getCurrentUser')
    if (store.getters['permission/getIsDynamicAddedRoute']) {
      next()
      return
    }

    const routes = await store.dispatch('permission/buildRoutesAction')

    routes.forEach((route: any) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })

    const redirectPath = (from.query.redirect || to.path) as string
    const redirect = decodeURIComponent(redirectPath)
    const nextData =
      to.path === redirect ? { ...to, replace: true } : { path: redirect }
    store.commit('permission/SET_DYNAMIC_ADDED_ROUTE', true)
    next(nextData)
  })
}
