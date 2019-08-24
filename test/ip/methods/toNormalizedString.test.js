const chai = require('chai')

const { assert } = chai
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { Ip } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = require('../../sample/ip')

describe('#prototype.toNormalizedString', () => {
  for (let test of tests) {
    const {
      name,
      inputString,
      normalizedString,
      type
    } = test

    it(name, () => {
      const expected = normalizedString
      const result = Ip.from(inputString, type).toNormalizedString()

      assert.strictEqual(result, expected, `#from(${inputString}).toNormalizedString() should return ${expected} but return ${result}`)
    })
  }
})
