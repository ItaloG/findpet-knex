export type Role = 'Instituição' | 'Contribuidor'

export interface AccountModel {
  id: string
  name: string
  email: string
  password: string
  role: Role
}
