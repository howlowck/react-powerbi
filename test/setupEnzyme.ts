import { configure } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

configure({ adapter: new EnzymeAdapter()})
// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto')

Object.defineProperty(global, 'crypto', {
  writable: true,
  value: {
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length)
  }
})
