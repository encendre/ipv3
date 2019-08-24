const { IPv4, IPv6 } = require('../internal/versions')

/**
 * 
 * @param {string} address 
 * @returns {boolean}
 */

function cidrVersion (address) {
  if (this.isValidCidr(address, IPv4)) return IPv4
  if (this.isValidCidr(address, IPv6)) return IPv6

  throw new Error('Wrong cidr format')
}

module.exports = cidrVersion
