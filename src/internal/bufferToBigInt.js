const { IPv4, IPv6, _normalize, _size, _bitsize } = require('./versions')

function bufferToBigInt (buffer, type) {
  // type = _normalize(type)

  let bigint

  switch (type) {
    case IPv4:
      bigint = BigInt(buffer.readUInt32BE(0))
      break
    case IPv6:
      bigint = (buffer.readBigUInt64BE(0) << 64n)
      bigint |= buffer.readBigUInt64BE(8)
      break
    default:
      throw new TypeError('Invalid type, should be IPv4 or IPv6')
  }

  return BigInt.asUintN(_bitsize(type), bigint)
}

module.exports = bufferToBigInt

