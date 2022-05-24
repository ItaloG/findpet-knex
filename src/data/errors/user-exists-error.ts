export class UserExistsError extends Error {
  constructor (param: string) {
    super(`${param} already in use`)
    this.name = 'UserExistsError'
  }
}
