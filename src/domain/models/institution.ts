import { CEP } from './cep'

export type InstitutionType = 'ONG' | 'CANIL' | 'VETERINÁRIO' | 'PETSHOP'

export interface InstitutionModel {
  account_id: string
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
