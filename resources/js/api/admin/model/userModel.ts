export interface User {
    username: string
    name: string
    email: string
    surname: string
    user_role_code: string
    last_update_date: string
}

export interface GetListUserParam {
    school_id: string
}

export interface DeleteListUserParam {
    accounts: string[]
}
