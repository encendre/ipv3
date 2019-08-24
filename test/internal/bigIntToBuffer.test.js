const chai = require('chai')
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { assert } = chai

const { IPv4, IPv6 } = require('../../src/internal/versions')
const bigIntToBuffer = require('../../src/internal/bigIntToBuffer')

const tests = [
  {
    name: '[ipv4] basics',
    bigint: 0xf00f00ffn,
    expected: 'f00f00ff',
    type: IPv4
  },
  {
    name: '[ipv6] basics',
    bigint: 0xef12002f0023f3450232121f11030fe3n,
    expected: 'ef12002f0023f3450232121f11030fe3',
    type: IPv6
  }
]


describe('internal.bigIntToBuffer', () => {
  for (let test of tests) {
    it(test.name, () => {
      const bigint = test.bigint
      const type = test.type
      const expected = Buffer.from(test.expected, 'hex')
      const result = bigIntToBuffer(bigint, type)

      assert.equalBytes(result, expected, `internal.bigIntToBuffer(${test.address}) should return ${test.expected} but return ${result.toString('hex')}`)
    })
  }
})
