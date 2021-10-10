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

export enum UserStatusEnum {
  REGISTERED = 1,
  AUTHENTICATED = 2,
  SIGNEDUP = 3,
  ACTIVE = 5,
  SUSPENDED = 9,
}

export enum UserStatusNameEnum {
  REGISTERED = 'registered',
  AUTHENTICATED = 'authenticated',
  SIGNEDUP = 'signedup',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

export const ListUserAdminStatus = [
  '-',
  UserAdminStatusEnum.NEW,
  UserAdminStatusEnum.INPROGRESS,
  UserAdminStatusEnum.COMPLETED,
  UserAdminStatusEnum.ONHOLD,
  UserAdminStatusEnum.REJECTED,
]

export const roles = {
  [UserRoleCodeEnum.STUDENT]: UserRoleEnum.STUDENT,
  [UserRoleCodeEnum.PARENT]: UserRoleEnum.PARENT,
  [UserRoleCodeEnum.TEACHER]: UserRoleEnum.TEACHER,
  [UserRoleCodeEnum.ADMIN]: UserRoleEnum.ADMIN,
}

export const userStatus = {
  [UserStatusEnum.REGISTERED]: UserStatusNameEnum.REGISTERED,
  [UserStatusEnum.AUTHENTICATED]: UserStatusNameEnum.AUTHENTICATED,
  [UserStatusEnum.SIGNEDUP]: UserStatusNameEnum.SIGNEDUP,
  [UserStatusEnum.ACTIVE]: UserStatusNameEnum.ACTIVE,
  [UserStatusEnum.SUSPENDED]: UserStatusNameEnum.SUSPENDED,
}
