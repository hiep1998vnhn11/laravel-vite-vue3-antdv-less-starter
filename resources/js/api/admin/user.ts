import { defHttp } from '/@/utils/http/axios'
import { User, GetListUserParam, DeleteListUserParam } from './model/userModel'
const indexApi = '/authorized-users'

export const getListUser = (params: GetListUserParam) =>
  defHttp.get<User[]>({ url: indexApi, params })
export const deleteListUser = (params: DeleteListUserParam) =>
  defHttp.delete({ url: indexApi, params })
export const uploadUser = (params: { data: any[] }) =>
  defHttp.put({ url: indexApi + '/upload', params })
