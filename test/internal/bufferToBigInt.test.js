const chai = require('chai')
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { assert } = chai

const { IPv4, IPv6 } = require('../../src/internal/versions')
const bufferToBigInt = require('../../src/internal/bufferToBigInt')

const tests = [
  {
    name: '[ipv4] basics',
    buffer: 'f00f00ff',
    expected: 0xf00f00ffn,
    type: IPv4
  },
  {
    name: '[ipv6] basics',
    buffer: 'ef12002f0023f3450232121f11030fe3',
    expected: 0xef12002f0023f3450232121f11030fe3n,
    type: IPv6
  }
]


describe('internal.bufferToBigInt', () => {
  for (let test of tests) {
    it(test.name, () => {
      const buffer = Buffer.from(test.buffer, 'hex')
      const type = test.type
      const expected = test.expected
      const result = bufferToBigInt(buffer, type)

      assert(result === expected, `internal.bufferToBigInt(${test.buffer}) should return ${test.expected.toString(16)} but return ${result.toString(16)}`)
    })
  }
})
