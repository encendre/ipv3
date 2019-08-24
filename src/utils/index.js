const internal = require('../internal')

function buildStaticsMethods (list, obj) {
  obj || (obj = {})

  for (let file of list) {
    const method = require(file)

    Object.defineProperty(obj, method.name, {
      value: method,
      enumerable: true
    })
  }

  return obj
}

module.exports = buildStaticsMethods([
  './isValid',
  './isValidCidr.js',
  './family.js',
  './version.js',
  './cidrVersion.js'
], internal)
