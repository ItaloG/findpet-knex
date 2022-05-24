import { CEP } from '../../../domain/models/cep'
import { InstitutionModel } from '../../../domain/models/institution'
import {
  AddInstitutionAccount,
  AddInstitutionAccountModel
} from '../../../domain/usecases/add-institution-account'
import { AddInstitutionAccountRepository } from '../../protocols/institution/add-institution-account-repository'
import { FindGeolocation } from '../../protocols/find-geolocation'
import { FindInstitutionByCnpjRepository } from '../../protocols/institution/find-institution-by-cnpj-repository'
import { FindInstitutionByEmailRepository } from '../../protocols/institution/find-institution-by-email-repository'
import { PasswordHashing } from '../../protocols/password-hashing'
import { UserExistsError } from '../../errors/user-exists-error'

export class DbAddInstitutionAccount implements AddInstitutionAccount {
  constructor (
    private addInstitutionAccountRepository: AddInstitutionAccountRepository,
    private findInstitutionByEmailRepository: FindInstitutionByEmailRepository,
    private findInstitutionByCnpj: FindInstitutionByCnpjRepository,
    private passwordHashing: PasswordHashing,
    private findGeolocation: FindGeolocation<CEP>
  ) {}

  async add (account: AddInstitutionAccountModel): Promise<InstitutionModel> {
    const emailInUse = await this.findInstitutionByEmailRepository.find(account.email)
    if (emailInUse) throw new UserExistsError('email')

    const cnpjInUse = await this.findInstitutionByCnpj.find(account.cnpj)
    if (cnpjInUse) throw new UserExistsError('cnpj')

    const hashedPassword = await this.passwordHashing.hash(account.password)

    const position = await this.findGeolocation.find(account.cep)

    const institution = await this.addInstitutionAccountRepository.add(Object.assign({}, account, { password: hashedPassword, lat: position.lat, lng: position.lng }))
    return institution
  }
}
