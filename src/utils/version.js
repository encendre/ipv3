const { IPv4, IPv6 } = require('../internal/versions')
const isValid = require('./isValid')

/**
 * 
 * @param {string} string 
 * @returns {IpType}
 */

function version (address) {
  if (isValid(address, IPv4)) return IPv4
  if (isValid(address, IPv6)) return IPv6

  throw new Error('Wrong ip format')
}

module.exports = version
