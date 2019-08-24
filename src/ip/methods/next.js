/**
 * @memberof Ip.prototype
 * 
 * @returns {Ip}
 */

function next () {
  return this.constructor.fromBigInt(
    this.toBigInt() + 1n,
    this.type
  )
}

module.exports = next
