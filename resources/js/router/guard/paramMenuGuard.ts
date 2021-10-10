import type { Router } from 'vue-router'
import { configureDynamicParamsMenu } from '../helper/menuHelper'
import { Menu } from '../types'
import { PermissionModeEnum } from '/@/enums/appEnum'
import { store } from '/@/store'

export function createParamMenuGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    if (!to.name) {
      next()
      return
    }
    if (!store.getters['permission/getIsDynamicAddedRoute']) {
      next()
      return
    }
    let menus: Menu[] = []
    if (isBackMode()) {
      menus = store.getters['permission/getBackMenuList']
    } else if (isRouteMappingMode()) {
      menus = store.getters['permission/getFrontMenuList']
    }
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params))
    next()
  })
}

const getPermissionMode = () => {
  return store.getters['app/getProjectConfig'].permissionMode
}

const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK
}

const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
}
