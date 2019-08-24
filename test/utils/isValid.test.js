const chai = require('chai')

const { assert } = chai

const utils = require('../../src/utils')
const { IPv4, IPv6 } = utils

const tests = [
  {
    name: '[ipv4] basics',
    address: '126.0.23.1',
    expected: true,
    type: IPv4
  },
  {
    name: '[ipv4] too much segments',
    address: '126.0.23.1.32',
    expected: false,
    type: IPv4
  },
  {
    name: '[ipv4] useless 0 (1)',
    address: '126.23.01.32',
    expected: false,
    type: IPv4
  },
  {
    name: '[ipv4] useless 0 (2)',
    address: '126.00.0.32',
    expected: false,
    type: IPv4
  },
  {
    name: '[ipv4] value of segment overflow (1)',
    address: '126.256.0.32',
    expected: false,
    type: IPv4
  },
  {
    name: '[ipv4] value of segment overflow (2)',
    address: '126.23.324.32',
    expected: false,
    type: IPv4
  },
  {
    name: '[ipv6] basics',
    address: 'ef12:2f:23:f345:232:121f:1103:0fe3',
    expected: true,
    type: IPv6
  },
  {
    name: '[ipv6] ipv4 embedded',
    address: 'ef12:2f:23:f345:232:121f:127.2.12.15',
    expected: true,
    type: IPv6
  },
  {
    name: '[ipv6] double colon',
    address: 'ef12:2f:23::0fe3',
    expected: true,
    type: IPv6
  },
  {
    name: '[ipv6] double colon and ipv4 embedded',
    address: 'ef12:2f:23::0fe3:12.234.22.90',
    expected: true,
    type: IPv6
  },
  {
    name: '[ipv6] value of segment overflow',
    address: 'ef12:2ff23::0fe3:3432',
    expected: false,
    type: IPv6
  },
  {
    name: '[ipv6] multiple double colon',
    address: 'ef12:2f::23::0fe3:3432',
    expected: false,
    type: IPv6
  },
  {
    name: '[ipv6] too much segments',
    address: 'ef12:2f:23:0fe3:3432:ef:ef:12f:23fe',
    expected: false,
    type: IPv6
  },
  {
    name: '[ipv6] too much segments with ipv4 embedded',
    address: 'ef12:2f:23:0fe3:3432:ef:ef:12.23.34.45',
    expected: false,
    type: IPv6
  },
  {
    name: '[ipv6] too much segments with double colon',
    address: 'ef12:2f:23:0fe3:3432::ef:ef:ef',
    expected: false,
    type: IPv6
  },
  {
    name: '[ipv6] too much segments with double colon and ipv4 embedded',
    address: 'ef12:2f:23:0fe3:3432::ef:12.12.43.233',
    expected: false,
    type: IPv6
  },
  {
    name: '[ipv6] wrong ipv4 embedded',
    address: 'ef12:3432::ef:12.12.43.233:f',
    expected: false,
    type: IPv6
  }
]

describe('#isValid', () => {
  for (let test of tests) {
    it(test.name, () => {
      const address = test.address
      const expected = test.expected
      const result = utils.isValid(address)

      assert.strictEqual(result, expected, `#isValid(${test.address}) should return ${test.expected} but return ${result}`)
    })
  }

  for (let test of tests) {
    it(test.name, () => {
      const address = test.address
      const type = test.type
      const expected = test.expected
      const result = utils.isValid(address, type)

      assert.strictEqual(result, expected, `#isValid(${test.address}, ${type.description}) should return ${test.expected} but return ${result}`)
    })
  }
})
