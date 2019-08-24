const chai = require('chai')
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { assert } = chai

const { IPv4, IPv6 } = require('../../src/internal/versions')
const parseString = require('../../src/internal/parseString')

const tests = [
  {
    name: '[ipv4] basics (1)',
    string: '126.0.23.1',
    expected: '7e001701',
    type: IPv4
  },
  {
    name: '[ipv4] basics (2)',
    string: '240.15.0.255',
    expected: 'f00f00ff',
    type: IPv4
  },
  {
    name: '[ipv6] basics',
    string: 'ef12:2f:23:f345:232:121f:1103:0fe3',
    expected: 'ef12002f0023f3450232121f11030fe3',
    type: IPv6
  },
  {
    name: '[ipv6] ipv4 embedded',
    string: 'ef12:2f:23:f345:232:121f:126.0.23.1',
    expected: 'ef12002f0023f3450232121f7e001701',
    type: IPv6
  },
  {
    name: '[ipv6] double colon',
    string: 'ef12:2f:23::0fe3',
    expected: 'ef12002f002300000000000000000fe3',
    type: IPv6
  },
  {
    name: '[ipv6] double colon and ipv4 embedded',
    string: 'ef12:2f:23::0fe3:126.0.23.1',
    expected: 'ef12002f0023000000000fe37e001701',
    type: IPv6
  },
  {
    name: '[ipv6] double colon at the start',
    string: '::1',
    expected: '00000000000000000000000000000001',
    type: IPv6
  },
  {
    name: '[ipv6] double colon at the end',
    string: '1234::',
    expected: '12340000000000000000000000000000',
    type: IPv6
  },
  {
    name: '[ipv6] only double colon',
    string: '::',
    expected: '00000000000000000000000000000000',
    type: IPv6
  }
]

describe('internal.parseString', () => {
  for (let test of tests) {
    it(test.name, () => {
      const string = test.string
      const type = test.type
      const expected = Buffer.from(test.expected, 'hex')
      const result = parseString(string, type)

      assert.equalBytes(result, expected, `internal.parseString(${test.string}) should return ${test.expected} but return ${result.toString('hex')}`)
    })
  }
})
