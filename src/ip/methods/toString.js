const { IPv4, IPv6 } = require('../../internal/versions')

/**
 * @enum {string}
 */
const IpStringFormat = {
  rfc5952: 'rfc5952',
  minimized: 'minimized',
  normalized: 'normalized',
  expanded: 'expanded',
  fixedlength: 'fixedlength'
}

/**
 * @memberof Ip.prototype
 * 
 * @param {IpFormat}
 * 
 * @returns {string}
 */

function toString (format = 'RFC5952') {
  if (this.type === IPv4) return this.toBuffer().join('.')

  switch (format.toLowerCase()) {
    case 'normalized':
      return this.toNormalizedString()
    case 'expanded':
    case 'fixedlength':
      return this.toExpandedString()
    case 'rfc5952':
    case 'minimized':
      return this.toMinimizedString()
    default:
      throw new RangeError('Unknow format')
  }
}

module.exports = toString
