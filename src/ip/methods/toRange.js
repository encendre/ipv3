/* const Range = require('../../range')

function toRange (prefixlength) {

  const mask = this.constructor.fromPrefixLength(prefixlength, this.type)

  return Range.fromMask(this, prefixlength)
}

module.exports = toRange
*/
module.exports = function toRange () {
  throw new Error('Not yet implemented')
}
