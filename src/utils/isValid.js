const { IPv4Reg, IPv6Reg } = require('../internal/regexps')
const { IPv4, IPv6, _normalize } = require('../internal/versions')

/**
 * 
 * @param {string} address 
 * @param {IpType} type 
 * @returns {boolean}
 */

function isValid (address, type) {
  switch (_normalize(type)) {
    case IPv4:
      return IPv4Reg.test(address)
    case IPv6:
      return IPv6Reg.test(address)
    default:
      return IPv4Reg.test(address) || IPv6Reg.test(address)
  }
}

module.exports = isValid
