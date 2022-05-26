import { InstitutionModel } from '../../../domain/models/institution'

export interface FindInstitutionByEmailRepository {
  find: (email: string) => Promise<InstitutionModel | null>
}
