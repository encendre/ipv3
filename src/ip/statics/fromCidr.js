const { _normalize } = require('../../internal/versions')
const utils = require('../../utils')

/**
 * @le
 * @memberof Ip
 * 
 * @param {string} value 
 * @param {IpType} type 
 * 
 * @returns {Ip}
 */

function fromCidr (string, type) {
  if (type === undefined) {
    type = utils.cidrVersion(string)
  } else if (_normalize(type) === this.cidrVersion(string)) {
    type = _normalize(type)
  } else {
    throw new Error('Type not correspond with the format')
  }

  const [address, prefixLength] = string.split('/')

  const mask = this.fromPrefixLength(parseInt(prefixLength, 10), type)

  return this.from(address, type).mask(mask)
}

module.exports = fromCidr
