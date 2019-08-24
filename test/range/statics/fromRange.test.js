const chai = require('chai')

const { assert } = chai
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { Ip, Range } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = [
  {
    name: '[ipv4] basics',
    first: '126.0.23.1',
    last: '126.0.23.30',
    type: IPv4
  },
  {
    name: '[ipv6] basics',
    first: '::3',
    last: '::1:1:1',
    type: IPv6
  }
]

describe('#Range.fromRange', () => {
  for (let test of tests) {
    const {
      name,
      first,
      last,
      type
    } = test

    it(name, () => {
      const expected = {
        type,
        first: Ip.from(first).toString(),
        last: Ip.from(last).toString()
      }

      const range = Range.fromRange(first, last, type)

      const result = {
        type: range.type,
        first: range.first().toString(),
        last: range.last().toString()
      }
      assert.deepStrictEqual(result, expected, `#Range.fromRange(${first}, ${last}) should return ${expected} but return ${result}`)
    })
  }
})
