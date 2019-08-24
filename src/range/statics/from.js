const utils = require('../../utils')

/**
 * @memberof Range
 * 
 * @param {Range|string} cidrOrAddressOrRange 
 * @param {number|string|IpType|undefined} prefixLengthOrAdressOrType 
 * @param {IpType|undefined} type 
 * 
 * @returns {Range}
 */

function from (cidrOrAddressOrRange, prefixLengthOrAdressOrType, type) {
  if (cidrOrAddressOrRange.constructor === this) {
    return cidrOrAddressOrRange
  }

  if (utils.isValidCidr(cidrOrAddressOrRange, prefixLengthOrAdressOrType)) {
    return this.fromCidr(cidrOrAddressOrRange, prefixLengthOrAdressOrType)
  }

  if (prefixLengthOrAdressOrType.constructor === Number) {
    return this.fromMask(cidrOrAddressOrRange, prefixLengthOrAdressOrType, type)
  }

  return this.fromRange(cidrOrAddressOrRange, prefixLengthOrAdressOrType, type)
}

module.exports = from
