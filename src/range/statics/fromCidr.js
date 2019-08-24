/**
 * @memberof Range
 * 
 * @param {string} cidr 
 * @param {IpType} type 
 * 
 * @returns {Range}
 */

function fromCidr (cidr, type) {
  const [address, prefixLength] = cidr.split('/')

  return this.fromMask(address, parseInt(prefixLength, 10))
}

module.exports = fromCidr
