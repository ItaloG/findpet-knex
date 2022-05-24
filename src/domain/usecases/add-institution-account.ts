import { CEP } from '../models/cep'
import { InstitutionModel, InstitutionType } from '../models/institution'

export interface AddInstitutionAccountModel {
  name: string
  email: string
  password: string
  type: InstitutionType
  cnpj: string
  street: string
  cep: CEP
  city: string
  state: string
  number: number
  complement?: string
  cellphone: number
  telephone: number
}

export interface AddInstitutionAccount {
  add: (account: AddInstitutionAccountModel) => Promise<InstitutionModel>
}
