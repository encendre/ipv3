function buildPrototype (list, obj) {
  for (let file of list) {
    const method = require(file)

    Object.defineProperty(obj, method.name, {
      value: method,
      enumerable: true
    })
  }

  return obj
}

module.exports = buildPrototype([
  './first',
  './last',
  './size',
  './contains',
  './containsRange.js'
], {})
