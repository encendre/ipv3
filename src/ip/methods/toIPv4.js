const { IPv4, IPv6, _bitsize } = require('../../internal/versions')

/**
 * @memberof Ip.prototype
 * 
 * @param {boolean} force 
 * 
 * @returns {Ip}
 */

function toIPv4 (force = false) {
  if (this.type === IPv4) return this
  if (!this.isIPv4Mapped() && !force) throw new TypeError(`Can't convert ${this} to IPv4 cause its not an IPv4Mapped`)

  return this.constructor.fromBigInt(
    BigInt.asUintN(_bitsize(IPv4), this.toBigInt()),
    IPv4
  )
}

module.exports = toIPv4
