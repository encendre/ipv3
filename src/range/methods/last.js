/**
 * @memberof Range.prototype
 * 
 * @returns {Ip}
 */

 function last () {
  if (this._lastIp === undefined) {
    throw new Error('Empty Range object')
    /*
    Object.defineProperty(
      this,
      '_lastIp',
      { value: 1 }
    )
    */
  }

  return this._lastIp
}

module.exports = last
