const { IPv4, IPv6 } = require('../../internal/versions')

/**
 * @memberof Ip.prototype
 * 
 * @returns {Ip}
 */

function toIPv6 () {
  if (this.type === IPv6) return this
  return this.constructor.fromBigInt(
    0xffff00000000n | this.toBigInt(),
    IPv6
  )
}

module.exports = toIPv6
