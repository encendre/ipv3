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
    inputs: [
      { ip: '126.0.23.0', expected: true  },
      { ip: '123.0.12.2', expected: false },
      { ip: '126.0.23.255', expected: true },
      { ip: '126.0.24.0', expected: false },
      { ip: '126.0.22.255', expected: false }
    ],
    type: IPv4
  },
  {
    name: '[ipv6] basics',
    cidr: 'ef12:2f:23:f345:232:121f:1103:fe3/64',
    inputs: [
      { ip: 'ef12:2f:23:f345:232:121f:13:fe3', expected: true },
      { ip: 'ef12:2f:23:f345::', expected: true },
      { ip: 'ef12:2f:23:f345:ffff:ffff:ffff:ffff', expected: true },
      { ip: 'ef12:2f:23:f346::', expected: false },
      { ip: 'ef12:2f:23:f344:ffff:ffff:ffff:ffff', expected: false },
    ],
    type: IPv6
  }
]

describe('#Range.prototype.contains', () => {
  for (let test of tests) {
    const {
      name,
      cidr,
      inputs,
      type
    } = test

    it(name, () => {
      for (let input of inputs) {
        const { ip, expected } = input
  
        const result = Range.fromCidr(cidr).contains(ip)
  
        assert.deepStrictEqual(result, expected, `#Range.fromCidr(${cidr}).contains(${ip}) should return ${expected} but return ${result}`)  
      }
    })
  }
})
