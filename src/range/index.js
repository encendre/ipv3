/**
 * @class
 * @classdesc Class representing a Range
 * @hideconstructor
 */

class Range {
  type
  _firstIp
  _lastIp

  constructor (data) {
    throw new Error('Not yet implemented')
  }

  * [Symbol.iterator] () {
    const last = this.last()

    let current = this.first()
    while (current.toBigInt() <= last.toBigInt()) {
      yield current
      current = current.next()
    }
  }
}

module.exports = Range

const statics = require('./statics')
const methods = require('./methods')

Object.assign(Range, statics)
Object.assign(Range.prototype, methods)

Range.done = true
