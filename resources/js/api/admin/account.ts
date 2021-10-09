import { defHttp } from '/@/utils/http/axios'
import {
    ListAccount,
    AccountCreateParams,
    GetListAccountParams,
    ToggleAccessParams,
    DeleteAccountParams,
    UpdateAccountParams,
    SchoolParams,
    UnsuspendAccountParams,
    ActionAccountParams,
    ApprovalEmailParams,
} from './model/accountModel'
import { BasicResponseMessage } from '../model/baseModel'
const indexApi = '/accounts'

export const getListAccount = (params: GetListAccountParams) =>
    defHttp.get<ListAccount>({ url: indexApi, params })

export const createAccount = (params: AccountCreateParams) =>
    defHttp.post<BasicResponseMessage>({ url: indexApi, params })

export const toggleAccessAccount = (params: ToggleAccessParams) =>
    defHttp.put({ url: indexApi + '/toggle-access', params })

export const deleteListAccount = (params: DeleteAccountParams) =>
    defHttp.delete({
        url: indexApi + '/delete',
        params,
    })

export const updateAccount = (params: UpdateAccountParams) =>
    defHttp.put({ url: indexApi + '/update', params })
export const actionAccount = (params: ActionAccountParams) =>
    defHttp.put({ url: indexApi + '/action', params })
export const getCountStudent = (params: SchoolParams) =>
    defHttp.get({ url: indexApi + '/get-count-status', params })

export const unsuspendAccount = (params: UnsuspendAccountParams) =>
    defHttp.put({ url: indexApi + '/unsuspend', params })

export const approvalEmail = (params: ApprovalEmailParams) =>
    defHttp.post({ url: indexApi + '/approvalEmail', params })
