import { BasicFetchResult } from '/@/api/model/baseModel'

export interface Account {
  username: string
  email: string
  name: string
  role_code: string
  staff_id: string
  student_id: string
  user_role_code: string
  user_admin_status: string
  update_date: string
  user_status: string
  school_profile: string
  learner_profile: string
}

export type ListAccount = BasicFetchResult<Account[]>

export interface AccountCreateParams {
  fullname: string
  phone: string
  email: string
  password: string
  password_confirmation: string
  description: string
  role: string
}

export interface GetListAccountParams {
  page?: number
  search_key?: string
  limit?: string
  user_role_code: string
  school_id: string
}

export interface ToggleAccessParams {
  username: string
  product_id: string
  status?: boolean
}

export interface DeleteAccountParams {
  list: (string | number | undefined)[]
  school_id: string
}

export interface ActionAccountParams {
  list: (string | number | undefined)[]
  school_id: string
  status: string
}

export interface UpdateAccountParams {
  key: string
  value?: string
  username: string
  school_id: string
  user_role_code: string
}

export interface SchoolParams {
  school_id: string
}

export interface UnsuspendAccountParams {
  school_id: string
  username: string
}

export interface ApprovalEmailParams {
  username: string
  email: string
}
