const Ip = require('../../ip')

/**
 * @memberof Range.prototype
 * 
 * @param {IpResolvable} ip 
 * 
 * @returns {boolean}
 */

function contains (ip) {
  ip = Ip.from(ip)

  if (ip.type !== this.type) false

  return this.first().toBigInt() <= ip.toBigInt() && ip.toBigInt() <= this.last().toBigInt()
}

module.exports = contains
