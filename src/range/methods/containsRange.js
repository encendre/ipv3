/**
 * @memberof Range.prototype
 * 
 * @param {Range} range 
 * 
 * @returns {boolean}
 */

function containsRange (range) {
  if (range.type !== this.type) false

  return this.first().toBigInt() <= range.first().toBigInt() && range.last().toBigInt() <= this.last().toBigInt()
}

module.exports = containsRange
