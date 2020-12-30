import { v4 } from 'uuid'

export default () => {
  return v4().split('-').join('')
}
