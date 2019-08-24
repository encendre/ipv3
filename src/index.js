const utils = require('./utils')
const Ip = require('./ip')
const Range = require('./range')

/* debug purpose */
console.log('Ip.done: ', Ip.done)
console.log('Range.done: ', Range.done)
if (!Ip.done) throw new Error('not Ip.done')
if (!Range.done) throw new Error('not Range.done')

module.exports = Object.assign(utils, {
  Ip,
  Range
})
