import { CnpjValidator } from '../presentation/protocols'
import { cnpj as validator } from 'cpf-cnpj-validator'

export class CnpjValidatorAdapter implements CnpjValidator {
  isValid (cnpj: string): boolean {
    return validator.isValid(cnpj)
  }
}
