import { AddInstitutionAccountRepository } from '../../../data/protocols/institution/add-institution-account-repository'
import { InstitutionPostgresRepository } from './sql/repositories/institution-postgres-repository'

const institutionPostgresRepository = new InstitutionPostgresRepository()

const addInstitutionAccountRepository: AddInstitutionAccountRepository = institutionPostgresRepository

export {
  addInstitutionAccountRepository
}
