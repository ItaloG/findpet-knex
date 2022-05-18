import { InstitutionModel, InstitutionType } from '../models/institution'

export interface AddInstitutionAccountModel {
  name: string
  email: string
  password: string
  type: InstitutionType
  cnpj: string
  cellphone: string
  telephone: string
}

export interface AddInstitutionAccount {
  add: (account: AddInstitutionAccountModel) => Promise<InstitutionModel>
}
