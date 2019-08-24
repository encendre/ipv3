const Ip = require('../../ip')
const { _bitsize } = require('../../internal/versions')

/**
 * @memberof Range
 * 
 * @param {string} address 
 * @param {number} prefixLength 
 * @param {iptool.type} type 
 * 
 * @returns {Range}
 */

function fromMask (address, prefixLength, type) {
  const first = Ip.from(address, type).cidr(prefixLength)
  const last = Ip.fromBigInt(
    first.toBigInt() | (BigInt.asUintN(_bitsize(first.type), (-1n)) >> BigInt(prefixLength)),
    first.type
  )

  return Object.create(this.prototype, {
    type: {
      value: first.type,
      enumerable: true
    },
    _firstIp: {
      value: first
    },
    _lastIp: {
      value: last
    }
  })
}

module.exports = fromMask
