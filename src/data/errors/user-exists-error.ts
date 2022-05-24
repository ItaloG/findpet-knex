export class UserExistsError extends Error {
  constructor (paramName: string) {
    super(`${paramName} already in use`)
    this.name = 'UserExistsError'
  }
}
