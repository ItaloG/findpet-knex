import bcrypt from 'bcrypt'
import { PasswordHashing } from '../../data/protocols/password-hashing'

export class BcryptAdapter implements PasswordHashing {
  constructor (private salt: number) {
  }

  async hash (password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.salt)
    return hashedPassword
  }

  async compare (password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}
