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
} from './singup-protocols'

interface SutTypes {
  sut: SingUpInstitutionController
  emailValidatorStub: EmailValidator
  cnpjValidatorStub: CnpjValidator
  addInstitutionAccountStub: AddInstitutionAccount
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeCnpjValidator = (): CnpjValidator => {
  class CnpjValidatorStub implements CnpjValidator {
    isValid (cnpj: string): boolean {
      return true
    }
  }

  return new CnpjValidatorStub()
}

const makeAddInstitutionAccount = (): AddInstitutionAccount => {
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

  return new AddInstitutionAccountStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const cnpjValidatorStub = makeCnpjValidator()
  const addInstitutionAccountStub = makeAddInstitutionAccount()
  const sut = new SingUpInstitutionController(
    emailValidatorStub,
    cnpjValidatorStub,
    addInstitutionAccountStub
  )

  return {
    sut,
    emailValidatorStub,
    cnpjValidatorStub,
    addInstitutionAccountStub
  }
}

describe('SingUpInstitution Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation')
    )
  })

  test('should return 400 if no type is provided', async () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    expect(httpResponse.body).toEqual(
      new MissingParamError('Cellphone and telephone')
    )
  })

  test('should return 400 if password confirmation fails', async () => {
    const { sut } = makeSut()
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
    expect(httpResponse.body).toEqual(
      new InvalidParamError('passwordConfirmation')
    )
  })

  test('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
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
    expect(httpResponse.body).toEqual(
      new InvalidParamError('email')
    )
  })
})
