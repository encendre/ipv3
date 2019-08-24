const chai = require('chai')

const { assert } = chai

const utils = require('../../src/utils')

const tests = [
  {
    name: '[ipv4] basics',
    address: '126.0.23.1',
    expected: 'ipv4'
  },
  {
    name: '[ipv4] wrong formatted',
    address: '126.00.23.1',
    shouldThrow: true
  },
  {
    name: '[ipv6] basics',
    address: 'ef12:2f:23:f345:232:121f:1103:0fe3',
    expected: 'ipv6'
  },
  {
    name: '[ipv6] ipv4 embedded',
    address: 'ef12:2f:23:f345:232:121f:127.2.12.15',
    expected: 'ipv6'
  },
  {
    name: '[ipv6] double colon',
    address: 'ef12:2f:23::0fe3',
    expected: 'ipv6'
  },
  {
    name: '[ipv6] double colon and ipv4 embedded',
    address: 'ef12:2f:23::0fe3:12.234.22.90',
    expected: 'ipv6'
  },
  {
    name: '[ipv6] wrong formatted',
    address: 'ef12:2f:23::0fe3::',
    shouldThrow: true
  },
  {
    name: 'random string',
    address: 'iazeeafv45',
    shouldThrow: true
  }
]

describe('#family', () => {
  for (let test of tests.filter(t => !t.shouldThrow)) {
    it(test.name, () => {
      const address = test.address
      const expected = test.expected
      const result = utils.family(address)

      assert.strictEqual(result, expected, `#family(${test.address}) should return ${test.expected} but return ${result}`)
    })
  }

  for (let test of tests.filter(t => t.shouldThrow)) {
    it(test.name, () => {
      const address = test.address

      assert.throws(() => utils.family(address), /.*/, `#family(${test.address}) shoud throw`)
    })
  }
})
