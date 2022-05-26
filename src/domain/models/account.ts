export type Role = 'Instituição' | 'Contribuidor'

export interface AccountModel {
  id: string
  name: string
  email: string
  password: string
  role: Role
}

export interface AddAccountModel {
  name: string
  email: string
  password: string
  role: Role
}
