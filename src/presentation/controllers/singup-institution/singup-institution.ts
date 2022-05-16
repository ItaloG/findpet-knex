import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import {
  CnpjValidator,
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from './singup-protocol'

export class SingUpInstitutionController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly cnpjValidator: CnpjValidator,
    private readonly addInstitutionAccount: AddInstitutionAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requireFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
        'type',
        'cnpj'
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
        telephone
      } = httpRequest.body

      if (!cellphone && !telephone) {
        return badRequest(new MissingParamError('Cellphone or telephone'))
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const isValidCnpj = this.cnpjValidator.isValid(cnpj)
      if (!isValidCnpj) {
        return badRequest(new InvalidParamError('cnpj'))
      }

      const account = await this.addInstitutionAccount.add({
        name,
        email,
        password,
        type,
        cnpj,
        cellphone,
        telephone
      })

      return ok(account)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
