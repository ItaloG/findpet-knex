import { UserExistsError } from '../errors/user-exists-error'
import { HttpResponse } from '../protocols/http'

export const serverConflict = (): HttpResponse => ({
  statusCode: 409,
  body: new UserExistsError()
})
