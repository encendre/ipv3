const chai = require('chai')

const { assert } = chai

const { Ip } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = require('../../sample/ip')

describe('#prototype.next', () => {
  for (let test of tests) {
    const {
      name,
      inputString,
      bigint,
      type
    } = test

    it(name, () => {
      const expected = bigint + 1n
      const result = Ip.from(inputString, type).next().toBigInt()

      assert.strictEqual(result, expected, `#from(${inputString}).next().toBigInt() should return ${expected.toString(16)} but return ${result.toString(16)}`)
    })
  }
})

