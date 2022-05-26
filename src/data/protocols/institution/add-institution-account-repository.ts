import { CEP } from '../../../domain/models/cep'
import { InstitutionModel, InstitutionType } from '../../../domain/models/institution'

export interface AddInstitutionAccountWithPositionModel {
  name: string
  email: string
  password: string
  type: InstitutionType
  cnpj: string
  description: string
  cellphone?: number
  telephone?: number
  street: string
  cep: CEP
  city: string
  state: string
  number: number
  complement?: string
  lat: string
  lng: string
}

export interface AddInstitutionAccountRepository {
  add: (institutionData: AddInstitutionAccountWithPositionModel) => Promise<InstitutionModel>
}
