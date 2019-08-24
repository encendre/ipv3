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
    first: '126.0.23.0',
    last: '126.0.23.255',
    size: 1n << 24n,
    type: IPv4,
    contains: [
      {
        args: ['126.0.23.0'],
        expected: true
      },
      {
        args: ['126.0.23.255'],
        expected: true
      },
      {
        args: ['126.0.23.10'],
        expected: true
      },
      {
        args: ['126.0.21.10'],
        expected: false
      },
      {
        args: ['ffff:126.0.23.4'],
        expected: false
      }
    ]
  },
  {
    name: '[ipv6] basics',
    cidr: 'ef12:2f:23:f345:232:121f:1103:fe3/64',
    first: 'ef12:2f:23:f345::',
    last: 'ef12:2f:23:f345:ffff:ffff:ffff:ffff',
    size: 1n << 64n,
    type: IPv6,
    contains: [
      {}
    ]
  }
]
