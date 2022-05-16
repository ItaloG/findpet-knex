export type InstitutionType = 'ONG' | 'CANIL' | 'VETERINÁRIO' | 'PETSHOP'

export interface InstitutionModel {
  account_id: string
  type: InstitutionType
  cnpj: string
  description: string
  cellphone?: string
  telephone?: string
  lat: string
  lng: string
}
