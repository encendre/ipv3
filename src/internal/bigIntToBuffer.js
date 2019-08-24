const { IPv4, IPv6, _normalize, _size, _bitsize } = require('./versions')

function bigIntToBuffer (bigint, type) {
  // type = _normalize(type)
  bigint = BigInt.asUintN(_bitsize(type), BigInt(bigint))

  const buffer = Buffer.allocUnsafe(_size(type))

  switch (type) {
    case IPv4:
      buffer.writeUInt32BE(Number(bigint))
      break
    case IPv6:
      buffer.writeBigUInt64BE(BigInt.asUintN(64, bigint >> 64n), 0)
      buffer.writeBigUInt64BE(BigInt.asUintN(64, bigint), 8)
      break
    default:
      throw new TypeError('Invalid type, should be IPv4 or IPv6')
  }

  return buffer
}

module.exports = bigIntToBuffer
