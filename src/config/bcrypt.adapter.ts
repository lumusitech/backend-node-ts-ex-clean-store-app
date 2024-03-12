import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

// Can make a class with static methods for hash and compare in place of this
export const bcryptAdapter = {
  hash(value: string): string {
    const salt = genSaltSync()
    return hashSync(value, salt)
  },
  compare(value: string, hash: string): boolean {
    return compareSync(value, hash)
  },
}
