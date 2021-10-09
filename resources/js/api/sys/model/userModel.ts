import { string } from 'vue-types'

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
    access_token: string
    env?: string
}

export interface RoleInfo {
    name: string
    id: string
}

/**
 * @description: Login interface return value
 */

export interface UserInfo {
    username: string
    type: string
    sub: string
    school_id: string
    email: string
    school_year: string | null
    staff_id: string | null
    role_code: string
    year_level: string
    ip_school: string
    ip_home: string
}
export interface LoginResultModel {
    access_token: string
    refresh_token: string
    userInfo: GetUserInfoModel
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
    username: string
    school_id: string
    school_year: string
    year_level: string
    ip_id: string
    ip_school: string
    ip_home: string
    dynamic_ip: string
    cognito_login_id: string
    avatar?: string
    roles: string[]
}

export interface ChangePasswordParams {
    password: string
    old_password: string
    password_confirmation: string
}

export interface GetCodeParams {
    email: string
}

export interface ResetPasswordParams {
    email: string
    code: string
}
