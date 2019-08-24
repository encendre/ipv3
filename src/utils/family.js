const { IPv4, IPv6 } = require('../internal/versions')
const version = require('./version')

/**
 * 
 * @param {string} address 
 * @returns {string|number}
 */

function family (address) {
  switch (version(address)) {
    case IPv4:
      return 'ipv4'
    case IPv6:
      return 'ipv6'
    default:
      throw new Error('Wrong ip format')
  }

  return 0
}

module.exports = family
