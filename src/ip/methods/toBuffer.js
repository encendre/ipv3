const bigIntToBuffer = require('../../internal/bigIntToBuffer')

/**
 * @memberof Ip.prototype
 * 
 * @returns {Buffer}
 */

function setBuffer (ip) {
  if (ip._bigint === undefined) throw new Error('Empty Ip object')

  Object.defineProperty(
    ip,
    '_buffer',
    { value: bigIntToBuffer(ip._bigint, ip.type) }
  )

  return ip._buffer
}

function toBuffer () {
  return Buffer.from(
    this._buffer || setBuffer(this)
  )
}

module.exports = toBuffer
