const chai = require('chai')

const { assert } = chai
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { Ip } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = [
  {
    name: '[ipv4] basics (1)',
    expected: '126.0.23.1',
    bigint: 0x7e001701n,
    type: IPv4,
  },
  {
    name: '[ipv4] basics (2)',
    expected: '240.15.0.255',
    bigint: 0xf00f00ffn,
    type: IPv4
  },
  {
    name: '[ipv4] too big int',
    bigint: 0xf00f00ff0f00f0ffn,
    type: IPv4,
    shouldThrow: true
  },
  {
    name: '[ipv6] basics',
    expected: 'ef12:2f:23:f345:232:121f:1103:fe3',
    bigint: 0xef12002f0023f3450232121f11030fe3n,
    type: IPv6
  },
  {
    name: '[ipv6] too big int',
    bigint: 0xef12002f0023f3450232121f11030fe3ffn,
    type: IPv6,
    shouldThrow: true
  },
  {
    name: 'autodetect type but too big int',
    bigint: 0xef12002f0023f34502321214333333333333333333333f11030n,
    shouldThrow: true
  },
  {
    name: 'negative big int',
    bigint: -0xef12002f0023f345023n,
    shouldThrow: true
  },
]


describe('#fromBigInt', () => {
  for (let test of tests.filter(t => !t.shouldThrow)) {
    it(test.name, () => {
      const bigint = test.bigint
      const type = test.type
      const expected = test.expected
      const result = Ip.fromBigInt(bigint, type).toNormalizedString()

      assert.strictEqual(result, expected, `#fromBigInt(${test.bigint.toString(16)}) should return ${test.expected} but return ${result}`)
    })
  }

  for (let test of tests.filter(t => t.shouldThrow)) {
    it(test.name, () => {
      const bigint = test.bigint
      const type = test.type

      assert.throw(() => Ip.fromBigInt(bigint, type), /.*/, `#fromBigInt(${test.bigint.toString(16)}) should throw`)
    })
  }
})
