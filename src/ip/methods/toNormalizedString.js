const { IPv4, IPv6 } = require('../../internal/versions')

/**
 * @memberof Ip.prototype
 * 
 * @returns {string}
 */

function toNormalizedString () {
  if (this.type === IPv4) return this.toString()

  const buffer = this.toBuffer()
  const segments = new Array(8)

  for (let i = 0; i < 8; i++) {
    const word = (buffer[2 * i] << 8) | buffer[2 * i + 1]

    segments[i] = word.toString(16)
  }

  if (this.isIPv4Mapped()) {
    segments.splice(6, 2, this.toIPv4())
  }

  return segments.join(':')
}

module.exports = toNormalizedString
