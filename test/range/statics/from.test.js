const chai = require('chai')

const { assert } = chai
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { Ip, Range } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = [
  {
    name: '[ipv4][cidr] basics',
    args: [
      '126.0.23.1/24'
    ],
    expected: {
      type: IPv4,
      first: '126.0.23.0',
      last: '126.0.23.255'
    },
    type: IPv4
  },
  {
    name: '[ipv6][cidr] basics',
    args: [
      'ef12:2f:23:f345:232:121f:1103:fe3/64'
    ],
    expected: {
      type: IPv6,
      first: 'ef12:2f:23:f345::',
      last: 'ef12:2f:23:f345:ffff:ffff:ffff:ffff'
    },
    type: IPv6
  },
  {
    name: '[ipv4][mask] basics',
    args: [
      '126.0.23.1',
      24
    ],
    expected: {
      type: IPv4,
      first: '126.0.23.0',
      last: '126.0.23.255'
    },
    type: IPv4
  },
  {
    name: '[ipv6][mask] basics',
    args: [
      'ef12:2f:23:f345:232:121f:1103:fe3',
      64
    ],
    expected: {
      type: IPv6,
      first: 'ef12:2f:23:f345::',
      last: 'ef12:2f:23:f345:ffff:ffff:ffff:ffff'
    },
    type: IPv6
  },
  {
    name: '[ipv4][range] basics',
    args: [
      '126.0.23.1',
      '126.0.23.30'
    ],
    expected: {
      type: IPv4,
      first: '126.0.23.1',
      last: '126.0.23.30'
    },
    type: IPv4
  },
  {
    name: '[ipv6][range] basics',
    args: [
      '::3',
      '::1:1:1'
    ],
    expected: {
      type: IPv6,
      first: '::3',
      last: '::1:1:1'
    },
    type: IPv6
  }
]

describe('#Range.from', () => {
  for (let test of tests) {
    const {
      name,
      args,
      expected,
      type
    } = test

    const {
      first,
      last
    } = expected

    it(name, () => {
      const expected = {
        type,
        first: Ip.from(first).toString(),
        last: Ip.from(last).toString()
      }

      const range = Range.from(...args)

      const result = {
        type: range.type,
        first: range.first().toString(),
        last: range.last().toString()
      }
      assert.deepStrictEqual(result, expected, `#Range.from(${args}) should return ${expected} but return ${result}`)
    })
  }
})
