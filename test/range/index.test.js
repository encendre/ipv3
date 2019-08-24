const chai = require('chai')

const { assert } = chai

const { Range } = require('../../src')

const methods = [
  'first',
  'last',
  'size',
  'contains'
]

const staticsMethods = [
  'from',
  'fromCidr',
  'fromMask',
  'fromRange'
]

describe('Integrity of Range', () => {
  for (const method of methods) {
    it(`Range.prototype.${method}`, () => {
      assert.isDefined(Range.prototype[method], `Range.prototype.${method} must be defined`)
    })
  }

  for (const method of staticsMethods) {
    it(`Range.${method}`, () => {
      assert.isDefined(Range[method], `Range.${method} must be defined`)
    })
  }
})
