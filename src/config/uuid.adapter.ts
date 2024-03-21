import { v4 as uuid } from 'uuid'

export class UUIDAdapter {
  static v4() {
    return uuid()
  }
}
