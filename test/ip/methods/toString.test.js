const chai = require('chai')

const { assert } = chai
const chaiBytes = require('chai-bytes')
chai.use(chaiBytes)

const { Ip } = require('../../../src')
const { IPv4, IPv6 } = require('../../../src/utils')

const tests = require('../../sample/ip')

describe('#prototype.toString', () => {
  for (let test of tests) {
    const {
      name,
      inputString,
      expandedString,
      minimizedString,
      normalizedString,
      type
    } = test

    it(`${name} default`, () => {
      const expected = minimizedString
      const result = Ip.from(inputString, type).toString()

      assert.strictEqual(result, expected, `#from(${inputString}).toString() should return ${expected} but return ${result}`)
    })

    it(`${name} expanded`, () => {
      const expected = expandedString
      const result = Ip.from(inputString, type).toString('expanded')

      assert.strictEqual(result, expected, `#from(${inputString}, 'expanded').toString() should return ${expected} but return ${result}`)
    })

    it(`${name} minimized`, () => {
      const expected = minimizedString
      const result = Ip.from(inputString, type).toString('minimized')

      assert.strictEqual(result, expected, `#from(${inputString}, 'minimized').toString() should return ${expected} but return ${result}`)
    })

    it(`${name} normalized`, () => {
      const expected = normalizedString
      const result = Ip.from(inputString, type).toString('normalized')

      assert.strictEqual(result, expected, `#from(${inputString}, 'normalized').toString() should return ${expected} but return ${result}`)
    })
  }
})
