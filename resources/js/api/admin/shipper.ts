import { defHttp } from '/@/utils/http/axios'
import { ListShipper } from './model/shipperModel'

const indexApi = '/admin/shippers'

export const getListShipper = () => defHttp.get<ListShipper>({ url: indexApi })
