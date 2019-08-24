const { IPv4CidrReg, IPv6CidrReg } = require('../internal/regexps')
const { IPv4, IPv6, _normalize } = require('../internal/versions')

/**
 * 
 * @param {string} address 
 * @param {IpType} type 
 * @returns {boolean}
 */

function isValidCidr (address, type) {
  switch (_normalize(type)) {
    case IPv4:
      return IPv4CidrReg.test(address)
    case IPv6:
      return IPv6CidrReg.test(address)
    default:
      return IPv4CidrReg.test(address) || IPv6CidrReg.test(address)
  }
}

module.exports = isValidCidr
