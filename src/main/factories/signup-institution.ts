import { DbAddInstitutionAccount } from '../../data/usecases/add-Institution-account/db-add-institution-account'
import { GoogleGeolocationApi } from '../../infra/apis/google-geolocation-api'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import {
  addInstitutionAccountRepository,
  findInstitutionByCnpjRepository,
  findInstitutionByEmailRepository
} from '../../infra/repositories/institution/institution-repository'
import { SingUpInstitutionController } from '../../presentation/controllers/singup-institution/singup-institution'
import { CnpjValidatorAdapter } from '../../utils/cnpj-validator-adapter'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpInstitutionController =
  (): SingUpInstitutionController => {
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const cnpjValidatorAdapter = new CnpjValidatorAdapter()
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const googleGeolocationApi = new GoogleGeolocationApi()
    const dbAddInstitutionAccount = new DbAddInstitutionAccount(
      addInstitutionAccountRepository,
      findInstitutionByEmailRepository,
      findInstitutionByCnpjRepository,
      bcryptAdapter,
      googleGeolocationApi
    )
    return new SingUpInstitutionController(
      emailValidatorAdapter,
      cnpjValidatorAdapter,
      dbAddInstitutionAccount
    )
  }
