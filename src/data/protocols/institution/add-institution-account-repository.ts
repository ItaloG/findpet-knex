import { InstitutionModel } from '../../../domain/models/institution'
import { AddInstitutionAccountModel } from '../../../domain/usecases/add-institution-account'

export interface AddInstitutionAccountRepository {
  add: (institutionData: AddInstitutionAccountModel) => Promise<InstitutionModel>
}
