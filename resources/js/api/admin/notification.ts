import { Notification, NotificationParams } from './model/notificationModel'
import { defHttp } from '/@/utils/http/axios'
const indexApi = '/notifications'

export const getListNotification = () =>
    defHttp.get<Notification[]>({ url: indexApi })

export const uploadUser = (params: { data: any[] }) =>
    defHttp.put({ url: indexApi + '/upload', params })

export const refreshNotification = () =>
    defHttp.post({ url: indexApi + '/refresh' })
export const acceptNotification = (params: NotificationParams) =>
    defHttp.post({ url: indexApi + '/accept', params })
export const rejectNotification = (params: NotificationParams) =>
    defHttp.post({ url: indexApi + '/reject', params })
