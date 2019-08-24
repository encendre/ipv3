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
    buffer: '7e001701',
    type: IPv4
  },
  {
    name: '[ipv4] basics (2)',
    expected: '240.15.0.255',
    buffer: 'f00f00ff',
    type: IPv4
  },
  {
    name: '[ipv4] auto detect type',
    expected: '240.15.0.255',
    buffer: 'f00f00ff'
  },
  {
    name: '[ipv4] shorter buffer',
    buffer: 'f00f',
    type: IPv4,
    shouldThrow: true
  },
  {
    name: '[ipv4] longer buffer',
    buffer: 'f00f00ff0f00f0ff',
    type: IPv4,
    shouldThrow: true
  },
  {
    name: '[ipv6] basics',
    expected: 'ef12:2f:23:f345:232:121f:1103:fe3',
    buffer: 'ef12002f0023f3450232121f11030fe3',
    type: IPv6
  },
  {
    name: '[ipv6] autodetect type',
    expected: 'ef12:2f:23:f345:232:121f:1103:fe3',
    buffer: 'ef12002f0023f3450232121f11030fe3'
  },
  {
    name: '[ipv6] shorter buffer',
    buffer: 'f00f',
    type: IPv6,
    shouldThrow: true
  },
  {
    name: '[ipv6] longer buffer',
    buffer: 'ef12002f0023f3450232121f11030fe3ff',
    type: IPv6,
    shouldThrow: true
  },
  {
    name: 'autodetect type but wrong length',
    buffer: 'ef12002f0023f3450232121f11030',
    // type: IPv6,
    shouldThrow: true
  }
]

describe('#fromBuffer', () => {
  for (let test of tests.filter(t => !t.shouldThrow)) {
    it(test.name, () => {
      const buffer = Buffer.from(test.buffer, 'hex')
      const type = test.type
      const expected = test.expected
      const offset = test.offset
      const result = Ip.fromBuffer(buffer, type, offset).toNormalizedString()

      assert.strictEqual(result, expected, `#fromBuffer(${test.buffer}) should return ${test.expected} but return ${result}`)
    })
  }

  for (let test of tests.filter(t => t.shouldThrow)) {
    it(test.name, () => {
      const buffer = Buffer.from(test.buffer, 'hex')
      const type = test.type

      assert.throw(() => Ip.fromBuffer(buffer, type), /.*/, `#fromBuffer(${test.buffer}) should throw`)
    })
  }
})
