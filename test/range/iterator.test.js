const chai = require('chai')
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { assert } = chai

const { Ip, Range } = require('../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = [
  {
    name: '[ipv4] basics',
    cidr: '126.0.23.1/29',
    type: IPv4
  },
  {
    name: '[ipv6] basics',
    cidr: 'ef12:2f:23:f345:232:121f:1103:fe3/122',
    type: IPv6
  }
]

// ef12:2f:23:f345:232:121f:1103:1000

describe('#Range[Symbol.iterator]', () => {
  for (let test of tests) {
    const {
      name,
      cidr
    } = test
    it(name, () => {
      const range = Range.fromCidr(cidr)

      let i = 0n
      for (const ip of range) {
        i++
        assert.ok(range.contains(ip), `All value iterated should be contained into the range (${ip.toString()})`)
      }
      assert.ok(i === range.size(), `The iterator length (${i}) should be equal to range size (${range.size()})`)
    })
  }
})
