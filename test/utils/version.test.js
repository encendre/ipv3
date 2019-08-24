const chai = require('chai')

const { assert } = chai

const utils = require('../../src/utils')
const { IPv4, IPv6 } = utils

const tests = [
  {
    name: '[ipv4] basics',
    address: '126.0.23.1',
    expected: IPv4
  },
  {
    name: '[ipv6] basics',
    address: 'ef12:2f:23:f345:232:121f:1103:0fe3',
    expected: IPv6
  },
  {
    name: '[ipv6] ipv4 embedded',
    address: 'ef12:2f:23:f345:232:121f:127.2.12.15',
    expected: IPv6
  },
  {
    name: '[ipv6] double colon',
    address: 'ef12:2f:23::0fe3',
    expected: IPv6
  },
  {
    name: '[ipv6] double colon and ipv4 embedded',
    address: 'ef12:2f:23::0fe3:12.234.22.90',
    expected: IPv6
  },
  {
    name: '[ipv6] wrong formatted',
    address: 'ef12:2f:23::0fe3::',
    shouldThrow: true
  },
  {
    name: 'random string',
    address: 'iazeeafv45',
    shouldThrow: true
  },
  {
    name: '[ipv4] wrong formatted',
    address: '126.00.23.1',
    shouldThrow: true
  }
]

describe('#version', () => {
  for (let test of tests.filter(t => !t.shouldThrow)) {
    it(test.name, () => {
      const address = test.address
      const expected = test.expected
      const result = utils.version(address)

      assert.strictEqual(result, expected, `#version(${test.address}) should return ${test.expected.toString()} but return ${result.toString()}`)
    })
  }

  for (let test of tests.filter(t => t.shouldThrow)) {
    it(test.name, () => {
      const address = test.address

      assert.throws(() => utils.version(address), /.*/, `#version(${test.address}) shoud throw`)
    })
  }
})
