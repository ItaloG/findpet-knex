import {
  InstitutionModel,
  InstitutionType
} from '../../../domain/models/institution'
import { AddInstitutionAccountModel } from '../../../domain/usecases/add-institution-account'
import { InvalidParamError, MissingParamError } from '../../errors'
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
  test('should return 400 if no name is provided', async () => {
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

  test('should return 400 if no email is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
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
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if no password is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        passwordConfirmation: 'any_password',
        type: 'valid_type',
        cnpj: 'valid_cnpj',
        cellphone: 'valid_cellphone',
        telephone: 'valid_telephone'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('should return 400 if no passwordConfirmation is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        type: 'valid_type',
        cnpj: 'valid_cnpj',
        cellphone: 'valid_cellphone',
        telephone: 'valid_telephone'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('should return 400 if no type is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cnpj: 'valid_cnpj',
        cellphone: 'valid_cellphone',
        telephone: 'valid_telephone'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('type'))
  })

  test('should return 400 if no cnpj is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        type: 'valid_type',
        cellphone: 'valid_cellphone',
        telephone: 'valid_telephone'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cnpj'))
  })

  test('should return 400 if no cellphone and telephone is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        type: 'valid_type',
        cnpj: 'valid_cnpj'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('Cellphone and telephone'))
  })

  test('should return 400 if password confirmation fails', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password',
        type: 'valid_type',
        cnpj: 'valid_cnpj',
        cellphone: 'valid_cellphone',
        telephone: 'valid_telephone'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })
})
