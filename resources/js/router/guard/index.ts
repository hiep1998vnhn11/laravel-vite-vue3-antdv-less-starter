import type { Router, RouteLocationNormalized } from 'vue-router'
import { store } from '/@/store'
import { AxiosCanceler } from '/@/utils/http/axios/axiosCancel'
import { Modal, notification } from 'ant-design-vue'
import { warn } from '/@/utils/log'
import { unref } from 'vue'
import { setRouteChange } from '/@/logics/mitt/routeChange'
import { createPermissionGuard } from './permissionGuard'
import { createStateGuard } from './stateGuard'
import nProgress from 'nprogress'
import projectSetting from '/@/settings/projectSetting'
import { createParamMenuGuard } from './paramMenuGuard'

export function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createPageLoadingGuard(router)
  createHttpGuard(router)
  createScrollGuard(router)
  createMessageGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
  createParamMenuGuard(router)
  createStateGuard(router)
}

/**
 * Hooks for handling page state
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()
  router.beforeEach(async (to) => {
    to.meta.loaded = !!loadedPageMap.get(to.path)
    setRouteChange(to)
    return true
  })

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true)
  })
}

function createPageLoadingGuard(router: Router) {
  const getOpenPageLoading =
    !!store.getters['app/getTransitionSetting']?.openPageLoading
  router.beforeEach(async (to) => {
    if (!store.getters['user/getToken']) {
      return true
    }
    if (to.meta.loaded) {
      return true
    }

    if (unref(getOpenPageLoading)) {
      store.dispatch('app/setPageLoadingAction', true)
      return true
    }

    return true
  })
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      setTimeout(() => {
        store.dispatch('app/setPageLoading', false)
      }, 220)
    }
    return true
  })
}
function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = projectSetting
  let axiosCanceler: Nullable<AxiosCanceler>
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler()
  }
  router.beforeEach(async () => {
    axiosCanceler?.removeAllPending()
    return true
  })
}

function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href)
  }

  const body = document.body

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) &&
      body.scrollTo(0, 0)
    return true
  })
}

/**
 * Used to close the message instance when the route is switched
 * @param router
 */
export function createMessageGuard(router: Router) {
  const { closeMessageOnSwitch } = projectSetting

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        Modal.destroyAll()
        notification.destroy()
      }
    } catch (error) {
      warn('message guard error:' + error)
    }
    return true
  })
}

export function createProgressGuard(router: Router) {
  const getOpenNProgress =
    store.getters['app/getTransitionSetting']?.openNProgress
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true
    }
    unref(getOpenNProgress) && nProgress.start()
    return true
  })

  router.afterEach(async () => {
    unref(getOpenNProgress) && nProgress.done()
    return true
  })
}
