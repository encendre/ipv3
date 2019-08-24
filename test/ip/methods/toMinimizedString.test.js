const chai = require('chai')

const { assert } = chai
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { Ip } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = require('../../sample/ip')

describe('#prototype.toMinimizedString', () => {
  for (let test of tests) {
    const {
      name,
      inputString,
      minimizedString,
      type
    } = test

    it(name, () => {
      const expected = minimizedString
      const result = Ip.from(inputString, type).toMinimizedString()

      assert.strictEqual(result, expected, `#from(${inputString}).toMinimizedString() should return ${expected} but return ${result}`)
    })
  }
})
