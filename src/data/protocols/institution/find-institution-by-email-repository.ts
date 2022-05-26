import { InstitutionModel } from '../../../domain/models/institution'

export interface FindInstitutionByEmailRepository {
  findByEmail: (email: string) => Promise<InstitutionModel | null>
}
