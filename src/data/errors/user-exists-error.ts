export class UserExistsError extends Error {
  constructor () {
    super('User already in created')
    this.name = 'UserExistsError'
  }
}
