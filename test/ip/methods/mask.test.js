const chai = require('chai')

const { assert } = chai
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { Ip } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = [
  {
    name: '[ipv4] basics (1)',
    address: '126.1.23.1',
    mask: '255.255.0.0',
    expected: '7e010000'
  },
  {
    name: '[ipv4] basics (2)',
    address: '240.15.0.255',
    mask: '255.0.0.0',
    expected: 'f0000000'
  },
  {
    name: '[ipv6] basics (1)',
    address: 'ef12:2f:23:f345:232:121f:1103:0fe3',
    mask: 'ffff:fff0::',
    expected: 'ef120020000000000000000000000000'
  },
  {
    name: '[ipv6] basics (2)',
    address: 'ef12:2f:23:f345::0:12',
    mask: 'ffff:ffff:ffff:ffff:ffff:ffff::',
    expected: 'ef12002f0023f3450000000000000000'
  }
]

describe('#prototype.mask', () => {
  for (let test of tests) {
    it(test.name, () => {
      const address = test.address
      const expected = Buffer.from(test.expected, 'hex')
      const mask = test.mask
      const result = Ip.from(address).mask(mask).toBuffer()

      assert.equalBytes(result, expected, `#mask(${address}).mask(${mask}) should return ${test.expected.toString('hex')} but return ${result.toString('hex')}`)
    })
  }
})
