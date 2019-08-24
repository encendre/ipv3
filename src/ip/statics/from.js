/**
 * An Ip, a buffer, a BigInt or a string which can be converted to ip
 * @typedef {Ip|Buffer|BigInt|string} IpResolvable
 */


/**
 * @memberof Ip
 * 
 * @param {IpResolvable} value 
 * @param {IpType} type 
 * 
 * @returns {Ip}
 */

function from (value, type) {
  switch (value.constructor) {
    case this:
      return value
    case Buffer:
      return this.fromBuffer(value, type)
    case BigInt:
      return this.fromBigInt(value, type)
    case String:
      return this.fromString(value, type)
    default:
      throw new TypeError('Invalid type, should be IPv4 or IPv6')
  }
}

module.exports = from
