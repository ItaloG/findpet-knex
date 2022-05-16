import { AccountModel, Role } from '../models/account'

export interface AddAcountModel {
  name: string
  email: string
  password: string
  role: Role
}

export interface AddAcount {
  add: (account: AddAcountModel) => Promise<AccountModel>
}
