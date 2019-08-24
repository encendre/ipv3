const { IPv4, IPv6, _normalize, _bitsize } = require('../../internal/versions')

/**
 * @memberof Ip
 * 
 * @param {BigInt} value 
 * @param {IpType} type 
 * 
 * @returns {Ip}
 */

function fromBigInt (bigint, type = IPv6) {
  if (bigint.constructor !== BigInt) bigint = BigInt(bigint)

  type = _normalize(type)

  if (bigint > 1n << BigInt(_bitsize(type))) throw new RangeError(`bigint should be < ${BigInt(_bitsize(type))}`)
  if (bigint < 0n) throw new RangeError('bigint should be positive')

  return Object.create(this.prototype, {
    type: {
      value: type,
      enumerable: true
    },
    _bigint: {
      value: BigInt.asUintN(_bitsize(type), bigint)
    }
  })
}

module.exports = fromBigInt
