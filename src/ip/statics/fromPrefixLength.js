const { IPv4, IPv6, _bitsize, _normalize } = require('../../internal/versions')

/**
 * @memberof Ip
 * 
 * @param {number} prefixlength 
 * @param {IpType} type 
 * 
 * @returns {Ip}
 */

function fromPrefixLength (prefixlength, type = IPv6) {
  type = _normalize(type)
  const bitsize = _bitsize(type)

  if (!Number.isInteger(prefixlength) || prefixlength < 0 || bitsize < prefixlength) {
    throw new RangeError(`Prefix length should be >= 0 and <= ${bitsize}`)
  }

  const bigint = BigInt.asUintN(bitsize, ((-1n) << BigInt(bitsize - prefixlength)))

  return this.fromBigInt(bigint, type)
}

module.exports = fromPrefixLength
