const chai = require('chai')

const { assert } = chai

const utils = require('../../src/utils')
const { IPv4, IPv6 } = utils

const tests = [
  {
    name: '[ipv4] basics',
    address: '126.0.23.1/23',
    expected: IPv4
  },
  {
    name: '[ipv6] basics',
    address: 'ef12:2f:23:f345:232:121f::/120',
    expected: IPv6
  },
  {
    name: '[ipv6] ipv4 embedded',
    address: 'ef12:2f:23:f345:232:121f:127.2.12.15/20',
    expected: IPv6
  },
  {
    name: '[ipv6] double colon',
    address: 'ef12:2f:23::0fe3/23',
    expected: IPv6
  },
  {
    name: '[ipv6] double colon and ipv4 embedded',
    address: 'ef12:2f:23::0fe3:12.234.22.90/122',
    expected: IPv6
  },
  {
    name: '[ipv6] to long prefixlen',
    address: 'ef12:2f:23::0fe3::/129',
    shouldThrow: true
  },
  {
    name: '[ipv4] to long prefixlen',
    address: '0.0.3.2/33',
    shouldThrow: true
  }
]

describe('#cidrVersion', () => {
  for (let test of tests.filter(t => !t.shouldThrow)) {
    it(test.name, () => {
      const address = test.address
      const expected = test.expected
      const result = utils.cidrVersion(address)

      assert.strictEqual(result, expected, `#cidrVersion(${test.address}) should return ${test.expected.toString()} but return ${result.toString()}`)
    })
  }

  for (let test of tests.filter(t => t.shouldThrow)) {
    it(test.name, () => {
      const address = test.address

      assert.throws(() => utils.cidrVersion(address), /.*/, `#cidrVersion(${test.address}) shoud throw`)
    })
  }
})
