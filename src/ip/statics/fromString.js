const { IPv4Reg, IPv6Reg } = require('../../internal/regexps')
const { IPv4, IPv6, _normalize } = require('../../internal/versions')
const parseString = require('../../internal/parseString')
const utils = require('../../utils')

/**
 * @memberof Ip
 * 
 * @param {string} string 
 * @param {IpType} type
 * 
 * @returns {Ip}
 */

function fromString (string, type) {
  if (type === undefined) {
    type = utils.version(string)
  } else if (_normalize(type) === utils.version(string)) {
    type = _normalize(type)
  } else {
    throw new Error('Type not correspond with the format')
  }

  const buffer = parseString(string, type)

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

module.exports = fromString
