import { InstitutionModel } from '../../../domain/models/institution'

export interface FindInstitutionByCnpjRepository {
  find: (cnpj: string) => Promise<InstitutionModel | null>
}
