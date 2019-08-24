function buildPrototype (list, ...objs) {
  const obj = {}

  for (let file of list) {
    const method = require(file)

    Object.defineProperty(obj, method.name, {
      value: method,
      enumerable: true
    })
  }

  return Object.assign(...objs, obj)
}

module.exports = buildPrototype([
  './toBuffer',
  './toString',
  './toBigInt',
  './toExpandedString',
  './toNormalizedString',
  './toMinimizedString',
  './toString',
  './mask',
  './cidr',
  './next',
  './toRange',
  //'./rangeMatch',
  './toIPv4',
  './toIPv6'
], require('./specialRanges'))
