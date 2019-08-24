const { IPv4, IPv6, _normalize, _sizeToVersion } = require('../../internal/versions')

/**
 * @memberof Ip
 * 
 * @param {Buffer} value 
 * @param {IpType} type 
 * 
 * @returns {Ip}
 */

function fromBuffer (buffer, type) {
  buffer = Buffer.from(buffer)

  if (type === undefined) {
    type = _sizeToVersion(buffer.length)
  } else if (_normalize(type) === _sizeToVersion(buffer.length)) {
    type = _normalize(type)
  } else {
    throw new Error('Type not correspond with the buffer length')
  }

  return Object.create(this.prototype, {
    type: {
      value: type,
      enumerable: true
    },
    _buffer: {
      value: buffer
    }
  })
}

module.exports = fromBuffer
