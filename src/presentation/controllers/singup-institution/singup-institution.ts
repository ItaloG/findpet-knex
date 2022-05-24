import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, ok, conflict } from '../../helpers/http-helper'
import {
  AddInstitutionAccount,
  CnpjValidator,
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from './singup-protocols'

export class SingUpInstitutionController implements Controller {
  constructor (
    private emailValidator: EmailValidator,
    private cnpjValidator: CnpjValidator,
    private addInstitutionAccount: AddInstitutionAccount
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requireFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
        'type',
        'cnpj',
        'cep',
        'city',
        'state',
        'number',
        'street'
      ]

      for (const field of requireFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const {
        name,
        email,
        password,
        passwordConfirmation,
        type,
        cnpj,
        cellphone,
        telephone,
        cep,
        city,
        state,
        number,
        street,
        complement
      } = httpRequest.body
      const sanitizedCnpj = cnpj.replace(/[/.-]/g, '')

      const institutionTypes = ['ONG', 'CANIL', 'VETERINÁRIO', 'PETSHOP']
      if (!institutionTypes.includes(type)) return badRequest(new InvalidParamError('type'))

      if (!cellphone && !telephone) return badRequest(new MissingParamError('Cellphone and telephone'))

      if (password !== passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))

      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) return badRequest(new InvalidParamError('email'))

      const isValidCnpj = this.cnpjValidator.isValid(sanitizedCnpj)
      if (!isValidCnpj) return badRequest(new InvalidParamError('cnpj'))

      const institutionAccount = await this.addInstitutionAccount.add({
        name,
        email,
        password,
        type,
        cnpj,
        cellphone,
        telephone,
        cep,
        complement,
        city,
        number,
        state,
        street
      })

      return ok(institutionAccount)
    } catch (error: any) {
      console.error(error)
      switch (error.name) {
        case 'UserExistsError':
          return conflict(error)
        default:
          return serverError()
      }
    }
  }
}
