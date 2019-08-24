const chai = require('chai')

const { assert } = chai
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { Ip } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = [
  {
    name: '[IPv4] Basics',
    ip: '123.65.45.211',
    expected: '::ffff:123.65.45.211'
  },
  {
    name: '[IPv6] Basics',
    ip: '::faaf:a:a:b:c',
    expected: '::faaf:a:a:b:c'
  }
]

describe('#prototype.toIPv6', () => {
  for (let test of tests) {
    const {
      name,
      ip,
      expected
    } = test

    it(name, () => {
      const result = Ip.from(ip).toIPv6().toMinimizedString()

      assert.strictEqual(result, expected, `#from(${ip}).toIPv6() should return ${expected} but return ${result}`)
    })
  }

})
