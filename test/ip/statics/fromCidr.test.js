const chai = require('chai')

const { assert } = chai

const { Ip } = require('../../../src')

const tests = [
  {
    name: '[ipv4] basics',
    address: '126.0.23.1/23',
    expected: '126.0.22.0'
  },
  {
    name: '[ipv6] basics',
    address: 'ef12:2f:23:f345:232:121f::/120',
    expected: 'ef12:2f:23:f345:232:121f:0:0'
  },
  {
    name: '[ipv6] ipv4 embedded',
    address: 'ef12:2f:23:f345:232:121f:127.2.12.15/20',
    expected: 'ef12:0:0:0:0:0:0:0'
  },
  {
    name: '[ipv6] double colon',
    address: 'ef12:2f:23::0fe3/23',
    expected: 'ef12:0:0:0:0:0:0:0'
  },
  {
    name: '[ipv6] double colon and ipv4 embedded',
    address: 'ef12:2f:23::0fe3:12.234.22.90/128',
    expected: 'ef12:2f:23:0:0:fe3:cea:165a'
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

describe('#fromCidr', () => {
  for (let test of tests.filter(t => !t.shouldThrow)) {
    it(test.name, () => {
      const address = test.address
      const expected = test.expected
      const result = Ip.fromCidr(address).toNormalizedString()

      assert.strictEqual(result, expected, `#fromCidr(${test.address}) should return ${test.expected.toString()} but return ${result.toString()}`)
    })
  }

  for (let test of tests.filter(t => t.shouldThrow)) {
    it(test.name, () => {
      const address = test.address

      assert.throws(() => Ip.fromCidr(address), /.*/, `#fromCidr(${test.address}) shoud throw`)
    })
  }
})
