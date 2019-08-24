const chai = require('chai')

const { assert } = chai

const { Ip } = require('../../src')

const methods = [
  'toBuffer',
  'toString',
  'toBigInt',
  'toExpandedString',
  'toNormalizedString',
  'toMinimizedString',
  'toString',
  'cidr',
  'next',
  'toRange'
]

const staticsMethods = [
  'from',
  'fromBuffer',
  'fromString',
  'fromBigInt',
  'fromPrefixLength',
  'fromCidr'
  // 'bigIntToBuffer',
  // 'bufferToBigInt',
  // 'isValid',
  // 'version',
  // 'family'
]

describe('Integrity of Ip', () => {
  for (const method of methods) {
    it(`Ip.prototype.${method}`, () => {
      assert.isDefined(Ip.prototype[method], `Ip.prototype.${method} must be defined`)
    })
  }

  for (const method of staticsMethods) {
    it(`Ip.${method}`, () => {
      assert.isDefined(Ip[method], `Ip.${method} must be defined`)
    })
  }
})
