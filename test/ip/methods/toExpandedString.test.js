const chai = require('chai')

const { assert } = chai
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { Ip } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = require('../../sample/ip')

describe('#prototype.toExpandedString', () => {
  for (let test of tests) {
    const {
      name,
      inputString,
      expandedString,
      type
    } = test

    it(name, () => {
      const expected = expandedString
      const result = Ip.from(inputString, type).toExpandedString()

      assert.strictEqual(result, expected, `#from(${inputString}).toExpandedString() should return ${expected} but return ${result}`)
    })
  }
})
