/**
 * @memberof Ip.prototype
 * 
 * @param {number} prefixlength
 * 
 * @returns {Ip}
 */

function cidr (prefixlength) {
  const mask = this.constructor.fromPrefixLength(prefixlength, this.type)

  return this.mask(mask)
}

module.exports = cidr
