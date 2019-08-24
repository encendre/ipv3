const chai = require('chai')
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { assert } = chai

const { Ip } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = [
  {
    name: '[ipv4][String] basics (1)',
    data: '126.0.23.1',
    expected: '7e001701',
    type: IPv4
  },
  {
    name: '[ipv4][String] basics (2)',
    data: '240.15.0.255',
    expected: 'f00f00ff',
    type: IPv4
  },
  {
    name: '[ipv4][String] autodetect (2)',
    data: '240.15.0.255',
    expected: 'f00f00ff',
  },
  {
    name: '[ipv4][String] not an IPv4',
    data: 'ef12:2f:23::0fe3:126.0.23.1',
    shouldThrow: true,
    type: IPv4
  },
  {
    name: '[ipv6][String] basics',
    data: 'ef12:2f:23:f345:232:121f:1103:0fe3',
    expected: 'ef12002f0023f3450232121f11030fe3',
    type: IPv6
  },
  {
    name: '[ipv6][String] ipv4 embedded',
    data: 'ef12:2f:23:f345:232:121f:126.0.23.1',
    expected: 'ef12002f0023f3450232121f7e001701',
    type: IPv6
  },
  {
    name: '[ipv6][String] double colon',
    data: 'ef12:2f:23::0fe3',
    expected: 'ef12002f002300000000000000000fe3',
    type: IPv6
  },
  {
    name: '[ipv6][String] double colon and ipv4 embedded',
    data: 'ef12:2f:23::0fe3:126.0.23.1',
    expected: 'ef12002f0023000000000fe37e001701',
    type: IPv6
  },
  {
    name: '[ipv6][String] double colon at the start',
    data: '::1',
    expected: '00000000000000000000000000000001',
    type: IPv6
  },
  {
    name: '[ipv6][String] double colon at the end',
    data: '1234::',
    expected: '12340000000000000000000000000000',
    type: IPv6
  },
  {
    name: '[ipv6][String] only double colon',
    data: '::',
    expected: '00000000000000000000000000000000',
    type: IPv6
  },
  {
    name: '[ipv6][String] autodetect',
    data: 'ef12:2f:23::0fe3:126.0.23.1',
    expected: 'ef12002f0023000000000fe37e001701',
  },
  {
    name: '[ipv6][String] not an IPv6',
    data: '127.0.0.11',
    shouldThrow: true,
    type: IPv6
  },
  {
    name: '[String] not an Ip',
    data: '127.0',
    shouldThrow: true,
    type: IPv6
  },
  {
    name: '[ipv4][Buffer] basics (1)',
    expected: '7e001701',
    data: Buffer.from('7e001701', 'hex'),
    type: IPv4,
  },
  {
    name: '[ipv4][Buffer] basics (2)',
    expected: 'f00f00ff',
    data: Buffer.from('f00f00ff', 'hex'),
    type: IPv4
  },
  {
    name: '[ipv4][Buffer] auto detect type',
    expected: 'f00f00ff',
    data: Buffer.from('f00f00ff', 'hex'),
  },
  {
    name: '[ipv4][Buffer] shortest data',
    data: Buffer.from('f00f', 'hex'),
    type: IPv4,
    shouldThrow: true
  },
  {
    name: '[ipv4][Buffer] longest buffer',
    data: Buffer.from('f00f00ff0f00f0ff', 'hex'),
    type: IPv4,
    shouldThrow: true
  },
  {
    name: '[ipv6][Buffer] basics',
    expected: 'ef12002f0023f3450232121f11030fe3',
    data: Buffer.from('ef12002f0023f3450232121f11030fe3', 'hex'),
    type: IPv6
  },
  {
    name: '[ipv6][Buffer] autodetect type',
    expected: 'ef12002f0023f3450232121f11030fe3',
    data: Buffer.from('ef12002f0023f3450232121f11030fe3', 'hex'),
  },
  {
    name: '[ipv6][Buffer] shortest buffer',
    data: Buffer.from('f00f', 'hex'),
    type: IPv6,
    shouldThrow: true
  },
  {
    name: '[ipv6][Buffer] longest buffer',
    data: Buffer.from('ef12002f0023f3450232121f11030fe3ff', 'hex'),
    type: IPv6,
    shouldThrow: true
  },
  {
    name: '[Buffer] autodetect type but wrong length',
    data: Buffer.from('ef12002f0023f3450232121f11030', 'hex'),
    // type: IPv6,
    shouldThrow: true
  },
  {
    name: '[ipv4][BigInt] basics (1)',
    expected: '7e001701',
    data: 0x7e001701n,
    type: IPv4,
  },
  {
    name: '[ipv4][BigInt] basics (2)',
    expected: 'f00f00ff',
    data: 0xf00f00ffn,
    type: IPv4
  },
  {
    name: '[ipv4][BigInt] too big int',
    data: 0xf00f00ff0f00f0ffn,
    type: IPv4,
    shouldThrow: true
  },
  {
    name: '[ipv6][BigInt] basics',
    expected: 'ef12002f0023f3450232121f11030fe3',
    data: 0xef12002f0023f3450232121f11030fe3n,
    type: IPv6
  },
  {
    name: '[ipv6][BigInt] too big int',
    data: 0xef12002f0023f3450232121f11030fe3ffn,
    type: IPv6,
    shouldThrow: true
  },
  {
    name: '[BigInt] autodetect type but too big int',
    data: 0xef12002f0023f34502321214333333333333333333333f11030n,
    shouldThrow: true
  },
  {
    name: 'negative big int',
    data: -0xef12002f0023f345023n,
    shouldThrow: true
  },
  {
    name: 'unsuported type',
    data: true,
    shouldThrow: true
  }
]

describe('#from', () => {
  for (let test of tests.filter(t => !t.shouldThrow)) {
    it(test.name, () => {
      const data = test.data
      const type = test.type
      const expected = Buffer.from(test.expected, 'hex')
      const result = Ip.from(data, type).toBuffer()

      assert.equalBytes(result, expected, `#from(${test.data}) should return ${test.expected} but return ${result.toString('hex')}`)
    })
  }

  for (let test of tests.filter(t => t.shouldThrow)) {
    it(test.name, () => {
      const data = test.data
      const type = test.type

      assert.throw(() => Ip.from(data, type), /.*./, `#from(${test.data}) should throw`)
    })
  }
})
