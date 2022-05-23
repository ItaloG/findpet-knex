import { AccountModel, Role } from '../models/account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
  role: Role
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
