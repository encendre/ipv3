const chai = require('chai')

const { assert } = chai
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { Ip } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = require('../../sample/ip')

describe('#prototype.toBuffer', () => {
  for (let test of tests) {
    const {
      name,
      inputString,
      buffer,
      type
    } = test

    it(name, () => {
      const expected = buffer
      const result = Ip.from(inputString, type).toBuffer()

      assert.equalBytes(result, expected, `#from(${inputString}).toBuffer() should return ${expected.toString('hex')} but return ${result.toString('hex')}`)
    })
  }
})
