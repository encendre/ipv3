const chai = require('chai')

const { assert } = chai
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { Ip, Range } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = [
  {
    name: '[ipv4] basics',
    cidr: '126.0.23.1/24',
    expected: 1n << (32n - 24n),
    type: IPv4
  },
  {
    name: '[ipv4] smallest range',
    cidr: '126.0.23.1/32',
    expected: 1n,
    type: IPv4
  },
  {
    name: '[ipv4] biggest range',
    cidr: '126.0.23.1/0',
    expected: 1n << 32n,
    type: IPv4
  },
  {
    name: '[ipv4] basics',
    cidr: '126.0.23.1/24',
    expected: 1n << (32n - 24n),
    type: IPv4
  },
  {
    name: '[ipv6] basics',
    cidr: 'ef12:2f:23:f345:232:121f:1103:fe3/63',
    expected: 1n << (128n - 63n),
    type: IPv6
  },
  {
    name: '[ipv6] smallest range',
    cidr: 'ef12:2f:23:f345:232:121f:1103:fe3/128',
    expected: 1n,
    type: IPv6
  },
  {
    name: '[ipv6] biggest range',
    cidr: 'ef12:2f:23:f345:232:121f:1103:fe3/0',
    expected: 1n << (128n - 0n),
    type: IPv6
  }
]

describe('#Range.prototype.size', () => {
  for (let test of tests) {
    const {
      name,
      cidr,
      expected,
    } = test

    it(name, () => {
      const range = Range.from(cidr)

      const result = range.size()
  
      assert.ok(result === expected, `#Range.from(${cidr}).size() should return ${expected} but return ${result}`)
    })
  }
})
