import { InstitutionModel } from '../../../domain/models/institution'

export interface FindInstitutionByCnpjRepository {
  findByCnpj: (cnpj: string) => Promise<InstitutionModel | null>
}
