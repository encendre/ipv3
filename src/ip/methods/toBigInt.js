const bufferToBigInt = require('../../internal/bufferToBigInt')

/**
 * @memberof Ip.prototype
 * 
 * @returns {BigInt}
 */

function setBigInt(ip) {
  if (ip._buffer === undefined) throw new Error('Empty Ip object')

  Object.defineProperty(
    ip,
    '_bigint',
    { value: bufferToBigInt(ip._buffer, ip.type) }
  )

  return ip._bigint
}

function toBigInt () {
  return this._bigint || (this._bigint === 0n ? 0n : setBigInt(this))
}

module.exports = toBigInt
