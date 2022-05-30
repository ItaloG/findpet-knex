import { Router } from 'express'
import { adapterRoute } from '../adapter/express-routes-adapter'
import { makeSignUpInstitutionController } from '../factories/signup-institution'

export default (router: Router): void => {
  router.post('/institution/signup', adapterRoute(makeSignUpInstitutionController()))
}
