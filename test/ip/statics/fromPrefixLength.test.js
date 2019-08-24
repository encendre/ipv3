const chai = require('chai')
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { assert } = chai

const { Ip } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

tests = [
  {
    name: '[ipv4] basics (1)',
    prefixlength: 4,
    expected: 'f0000000',
    type: IPv4
  },
  {
    name: '[ipv4] basics (2)',
    prefixlength: 0,
    expected: '00000000',
    type: IPv4
  },
  {
    name: '[ipv4] basics (3)',
    prefixlength: 32,
    expected: 'ffffffff',
    type: IPv4
  },
  {
    name: '[ipv6] basics (1)',
    prefixlength: 24,
    expected: 'ffffff00000000000000000000000000',
    type: IPv6
  },
  {
    name: '[ipv6] basics (2)',
    prefixlength: 0,
    expected: '00000000000000000000000000000000',
    type: IPv6
  },
  {
    name: '[ipv6] basics (3)',
    prefixlength: 100,
    expected: 'fffffffffffffffffffffffff0000000',
    type: IPv6
  },
  {
    name: '[ipv6] basics (4)',
    prefixlength: 128,
    expected: 'ffffffffffffffffffffffffffffffff',
    type: IPv6
  },
  {
    name: '[ipv4] negative length',
    prefixlength: -1,
    shouldThrow: true,
    type: IPv4
  },
  {
    name: '[ipv4] floating length',
    prefixlength: 1.3,
    shouldThrow: true,
    type: IPv4
  },
  {
    name: '[ipv4] length > _size(IPv4)',
    prefixlength: 33,
    shouldThrow: true,
    type: IPv4
  },
  {
    name: '[ipv6] floating length',
    prefixlength: 1.3,
    shouldThrow: true,
    type: IPv6
  },
  {
    name: '[ipv6] negative length',
    prefixlength: -1,
    shouldThrow: true,
    type: IPv6
  },
  {
    name: '[ipv6] length > _size(IPv6)',
    prefixlength: 129,
    shouldThrow: true,
    type: IPv6
  }
]

describe('#fromPrefixLength', () => {
  for (let test of tests.filter(t => !t.shouldThrow)) {
    it(test.name, () => {
      const type = test.type
      const prefixlength = test.prefixlength
      const expected = Buffer.from(test.expected, 'hex')
      const a = Ip.fromPrefixLength(prefixlength, type)
      const result = a.toBuffer()

      assert.equalBytes(result, expected, `#fromPrefixLength(${prefixlength}) should return ${test.expected} but return ${result.toString('hex')}`)
    })
  }

  for (let test of tests.filter(t => t.shouldThrow)) {
    it(test.name, () => {
      const type = test.type
      const prefixlength = test.prefixlength

      assert.throw(() => Ip.fromPrefixLength(prefixlength, type), /.*/, `#fromPrefixLength(${prefixlength}) should throw`)
    })
  }
})
