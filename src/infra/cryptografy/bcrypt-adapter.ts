
import bcrypt from 'bcrypt'
import { IEncrypter } from '../../data/protocols/encrypter'
import { IHashComparer } from '../../data/protocols/hashComparer'

export class BcryptAdapter implements IEncrypter, IHashComparer {
  async encrypt (value: string): Promise<string> {
    const salt = 12
    const hashed = await bcrypt.hash(value, salt)
    return hashed
  }

  async compare (value: string, hashedValue: string): Promise<boolean> {
    return await bcrypt.compare(value, hashedValue)
  }
}
