/**
 * @memberof Ip.prototype
 * 
 * @param {IpResolvable} address 
 * 
 * @returns {Ip}
 */

function mask (address) {
  address = this.constructor.from(address)

  return this.constructor.fromBigInt(
    this.toBigInt() & address.toBigInt(),
    this.type
  )
}

module.exports = mask
