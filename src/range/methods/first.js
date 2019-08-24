/**
 * @memberof Range.prototype
 * 
 * @returns {Ip}
 */

function first () {
  if (this._firstIp === undefined) {
    throw new Error('Empty Range object')
    /*
    Object.defineProperty(
      this,
      '_firstIp',
      { value: 1 }
    )
    */
  }

  return this._firstIp
}

module.exports = first
