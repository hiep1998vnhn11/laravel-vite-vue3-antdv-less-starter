export enum RoleEnum {
    S9 = 'S9',
    S8 = 'S8',
    S7 = 'S7',
    S5 = 'S5',
    S3 = 'S3',
    S1 = 'S1',
}

export enum EmployeeRoleEnum {
    SHIPPER = 'shipper',
    OWNER = 'owner',
}

export enum UserRoleCodeEnum {
    STUDENT = 'S',
    TEACHER = 'T',
    PARENT = 'P',
    ADMIN = 'A',
}

export enum UserRoleEnum {
    STUDENT = 'Student',
    PARENT = 'Parent',
    TEACHER = 'Teacher',
    ADMIN = 'Edapt Admin',
}

export enum ProductAccessEnum {
    SCHOOLPROFILE = 'SP',
    LEARNERPROFILE = 'LP',
}

export enum UserAdminStatusEnum {
    NEW = 'new',
    INPROGRESS = 'in progress',
    COMPLETED = 'completed',
    ONHOLD = 'paused',
    REJECTED = 'suspended',
}

export const ListUserAdminStatus = {
    1: UserAdminStatusEnum.NEW,
    2: UserAdminStatusEnum.INPROGRESS,
    3: UserAdminStatusEnum.COMPLETED,
    4: UserAdminStatusEnum.ONHOLD,
    9: UserAdminStatusEnum.REJECTED,
}

export const roles = {
    [UserRoleCodeEnum.STUDENT]: UserRoleEnum.STUDENT,
    [UserRoleCodeEnum.PARENT]: UserRoleEnum.PARENT,
    [UserRoleCodeEnum.TEACHER]: UserRoleEnum.TEACHER,
    [UserRoleCodeEnum.ADMIN]: UserRoleEnum.ADMIN,
}
