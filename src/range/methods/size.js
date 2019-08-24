/**
 * @memberof Range.prototype
 * 
 * @returns {BigInt}
 */


function size () {
  return this.last().toBigInt() - this.first().toBigInt() + 1n
}

module.exports = size
