const { IPv4, IPv6 } = require('../../internal/versions')

/**
 * @memberof Ip.prototype
 * 
 * @returns {string}
 */

function toMinimizedString () {
  if (this.type === IPv4) return this.toString()


  const buffer = this.toBuffer()
  const segments = new Array(8)
  const best = {
    index: -1,
    length: 0
  }
  const current = {
    index: -1,
    length: 0
  }

  for (let i = 0; i < 8; i++) {
    const word = (buffer[2 * i] << 8) | buffer[2 * i + 1]
    segments[i] = word.toString(16)

    if (word === 0) {
      if (current.length === 0) {
        current.index = i
      }

      current.length += 1

      if (current.length > best.length) {
        Object.assign(best, current)
      }
    } else {
      current.length = 0
    }
  }

  if (this.isIPv4Mapped()) {
    segments.splice(6, 2, this.toIPv4())
  }

  if (best.length > 0) {
    segments.splice(best.index, best.length, '')
  }

  if (segments[0] === '') {
    segments.unshift('')
  }

  if (segments[segments.length - 1] === '') {
    segments.push('')
  }

  return segments.join(':')
}

module.exports = toMinimizedString
