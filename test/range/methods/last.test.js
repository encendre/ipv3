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
    expected: '126.0.23.255',
    type: IPv4
  },
  {
    name: '[ipv6] basics',
    cidr: 'ef12:2f:23:f345:232:121f:1103:fe3/64',
    expected: 'ef12:2f:23:f345:ffff:ffff:ffff:ffff',
    type: IPv6
  }
]

describe('#Range.prototype.last', () => {
  for (let test of tests) {
    const {
      name,
      cidr,
      expected,
    } = test

    it(name, () => {
      const result = Range.fromCidr(cidr).last().toString()

      assert.deepStrictEqual(result, expected, `#Range.fromCidr(${cidr}).last() should return ${expected} but return ${result}`)
    })
  }
})
