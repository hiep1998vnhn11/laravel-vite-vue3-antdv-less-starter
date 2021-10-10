import { defHttp } from '/@/utils/http/axios'
import {
    LoginParams,
    LoginResultModel,
    GetUserInfoModel,
    ChangePasswordParams,
    GetCodeParams,
    ResetPasswordParams,
} from './model/userModel'
enum Api {
    Login = '/auth/login',
    Logout = '/auth/logout',
    GetUserInfo = '/auth/me',
    GetPermCode = '/getPermCode',
    ChangePassword = '/auth/change-password',
    GetCode = '/auth/reset-password',
    ConfirmResetPassword = '/auth/confirm-reset-password',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams) {
    return defHttp.post<LoginResultModel>(
        {
            url: Api.Login,
            params,
        },
        {
            errorMessageMode: 'message',
        }
    )
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
    return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo })
}

export function getPermCode() {
    return defHttp.get<string[]>({ url: Api.GetPermCode })
}

export function doLogout() {
    return defHttp.post({ url: Api.Logout })
}

export function changePassword(params: ChangePasswordParams) {
    return defHttp.post(
        { url: Api.ChangePassword, params },
        {
            errorMessageMode: 'modal',
        }
    )
}

export function getCodeResetPassword(params: GetCodeParams) {
    return defHttp.post({ url: Api.GetCode, params })
}

export function resetPassword(params: ResetPasswordParams) {
    return defHttp.post({ url: Api.ConfirmResetPassword, params })
}
