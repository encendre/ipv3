const { _normalize } = require('../../internal/versions')
const Ip = require('../../ip')

/**
 * @memberof Range
 * 
 * @param {IpResolvable} first 
 * @param {IpResolvable} last 
 * @param {IpType} type
 * 
 * @returns {Range} 
 */

function fromRange (first, last, type) {
  first = Ip.from(first, type)

  // if no type specified we force the second ip to be the same type of the first
  type || (type = first.type)

  last = Ip.from(last, type)

  return Object.create(this.prototype, {
    type: {
      value: _normalize(type),
      enumerable: true
    },
    _firstIp: {
      value: first
    },
    _lastIp: {
      value: last
    }
  })
}

module.exports = fromRange
