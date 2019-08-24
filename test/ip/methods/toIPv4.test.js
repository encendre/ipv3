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
    expected: '123.65.45.211'
  },
  {
    name: '[IPv6] Basics',
    ip: '::ffff:12.54.34.1',
    expected: '12.54.34.1'
  },
  {
    name: '[IPv6] No IPv4Mapped',
    ip: '::12.54.34.1',
    shouldThrow: true
  },
  {
    name: '[IPv6] No IPv4Mapped but force',
    ip: '123::12.54.34.1',
    expected: '12.54.34.1',
    force: true
  }
]

describe('#prototype.toIPv4', () => {
  for (let test of tests.filter(t => !t.shouldThrow)) {
    const {
      name,
      ip,
      force,
      expected
    } = test

    it(name, () => {
      const result = Ip.from(ip).toIPv4(!!force).toMinimizedString()

      assert.strictEqual(result, expected, `#from(${ip}).toIPv4(${!!force}) should return ${expected} but return ${result}`)
    })
  }

  for (let test of tests.filter(t => t.shouldThrow)) {
    const {
      name,
      ip,
      force 
    } = test

    it(name, () => {
      assert.throw(() => Ip.from(ip).toIPv4(!!force), /.*/, `#from(${ip}).toIPv4(${!!force}) should throw`)
    })
  }

})
