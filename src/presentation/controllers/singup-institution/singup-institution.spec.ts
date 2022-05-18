import {
  InstitutionModel,
  InstitutionType
} from '../../../domain/models/institution'
import { AddInstitutionAccountModel } from '../../../domain/usecases/add-institution-account'
import { MissingParamError } from '../../errors'
import { SingUpInstitutionController } from './singup-institution'
import {
  AddInstitutionAccount,
  CnpjValidator,
  EmailValidator
} from './singup-protocol'

class EmailValidatorStub implements EmailValidator {
  isValid (email: string): boolean {
    return true
  }
}

class CnpjValidatorStub implements CnpjValidator {
  isValid (cnpj: string): boolean {
    return true
  }
}

class AddInstitutionAccountStub implements AddInstitutionAccount {
  async add (account: AddInstitutionAccountModel): Promise<InstitutionModel> {
    const fakeInstitution = {
      account_id: 'uuid',
      type: 'ONG' as InstitutionType,
      cnpj: 'valid_cnpj',
      description: 'default_description',
      cellphone: 'valid_cellphone',
      telephone: 'valid_telephone',
      lat: 'valid_lat',
      lng: 'valid_lng'
    }

    return await new Promise((resolve) => resolve(fakeInstitution))
  }
}

const sut = new SingUpInstitutionController(
  new EmailValidatorStub(),
  new CnpjValidatorStub(),
  new AddInstitutionAccountStub()
)

describe('SingUpInstitution Controller', () => {
  test('should return 400 if no name is not provided', async () => {
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        type: 'valid_type',
        cnpj: 'valid_cnpj',
        cellphone: 'valid_cellphone',
        telephone: 'valid_telephone'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
})
