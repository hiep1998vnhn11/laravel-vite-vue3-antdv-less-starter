import type { AppRouteRecordRaw } from '/@/router/types'
import { REDIRECT_NAME, LAYOUT, EXCEPTION_COMPONENT } from '/@/router/constant'

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    component: LAYOUT,
    meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
    },
    children: [
        {
            path: '/:path(.*)*',
            name: 'ErrorPage',
            component: EXCEPTION_COMPONENT,
            meta: {
                title: 'ErrorPage',
                hideBreadcrumb: true,
            },
        },
    ],
}
