const chai = require('chai')

const { assert } = chai

const utils = require('../../src/utils')
const { IPv4, IPv6 } = utils

const tests = [
  {
    name: '[ipv4] basics',
    address: '126.0.23.1/32',
    expected: true,
    type: IPv4
  },
  {
    name: '[ipv4] too long prefixlen',
    address: '126.0.23.1/33',
    expected: false,
    type: IPv4
  },
  {
    name: '[ipv6] basics',
    address: 'ef12:2f:23:f345:232:121f:1103:0fe3/10',
    expected: true,
    type: IPv6
  },
  {
    name: '[ipv6] ipv4 embedded',
    address: 'ef12:2f:23:f345:232:121f:127.2.12.15/5',
    expected: true,
    type: IPv6
  },
  {
    name: '[ipv6] double colon',
    address: 'ef12:2f:23::0fe3/20',
    expected: true,
    type: IPv6
  },
  {
    name: '[ipv6] double colon and ipv4 embedded',
    address: 'ef12:2f:23::0fe3:12.234.22.90/128',
    expected: true,
    type: IPv6
  },
  {
    name: '[ipv6] to long prefixlen',
    address: 'ef12:2ff23::0fe3:3432/129',
    expected: false,
    type: IPv6
  }
]

describe('#isValidCidr', () => {
  for (let test of tests) {
    it(test.name, () => {
      const address = test.address
      const expected = test.expected
      const result = utils.isValidCidr(address)

      assert.strictEqual(result, expected, `#isValidCidr(${test.address}) should return ${test.expected} but return ${result}`)
    })
  }

  for (let test of tests) {
    it(`${test.name} (with type)`, () => {
      const address = test.address
      const type = test.type
      const expected = test.expected
      const result = utils.isValidCidr(address, type)

      assert.strictEqual(result, expected, `#isValidCidr(${test.address}, ${type.description}) should return ${test.expected} but return ${result}`)
    })
  }
})
