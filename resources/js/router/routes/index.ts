import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'
import { mainOutRoutes } from './mainOut'
import { PageEnum } from '/@/enums/pageEnum'

const modules = import.meta.globEager('./modules/**/*.ts')

const routeModuleList: AppRouteModule[] = []

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routeModuleList.push(...modList)
})

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]

export const RootRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
        title: 'Root',
    },
}

export const LoginRoute: AppRouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: () => import('/@/pages/auth/Login.vue'),
    meta: {
        title: 'routes.basic.login',
    },
}

export const PermissionRoute: AppRouteRecordRaw = {
    path: '/permission',
    name: 'Permission',
    component: () => import('/@/pages/auth/Permission.vue'),
    meta: {
        title: 'permission',
    },
}

// Basic routing without permission
// export const basicRoutes = [
//     LoginRoute,
//     RootRoute,
//     PermissionRoute,
//     ...mainOutRoutes,
// ]
export const basicRoutes = [LoginRoute]
