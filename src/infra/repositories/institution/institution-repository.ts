import { AddInstitutionAccountRepository } from '../../../data/protocols/institution/add-institution-account-repository'
import { FindInstitutionByEmailRepository } from '../../../data/protocols/institution/find-institution-by-email-repository'
import { InstitutionPostgresRepository } from './sql/repositories/institution-postgres-repository'

const institutionPostgresRepository = new InstitutionPostgresRepository()

const addInstitutionAccountRepository: AddInstitutionAccountRepository = institutionPostgresRepository
const findInstitutionByEmailRepository: FindInstitutionByEmailRepository = institutionPostgresRepository

export {
  addInstitutionAccountRepository,
  findInstitutionByEmailRepository
}
