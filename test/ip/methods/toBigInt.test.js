const chai = require('chai')

const { assert } = chai

const { Ip } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = require('../../sample/ip')

describe('#prototype.toBigInt', () => {
  for (let test of tests) {
    const {
      name,
      inputString,
      bigint,
      type
    } = test

    it(name, () => {
      const expected = bigint
      const result = Ip.from(inputString, type).toBigInt()

      assert.strictEqual(result, expected, `#from(${inputString}).toBigInt() should return ${expected.toString(16)} but return ${result.toString(16)}`)
    })
  }
})
