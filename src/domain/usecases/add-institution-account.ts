import { InstitutionModel, InstitutionType } from '../models/institution'

export interface AddInstitutionAccountModel {
  account_id: string
  type: InstitutionType
  cnpj: string
  cellphone: string
  telephone: string
}

export interface AddInstitutionAccount {
  add: (account: AddInstitutionAccountModel) => Promise<InstitutionModel>
}
