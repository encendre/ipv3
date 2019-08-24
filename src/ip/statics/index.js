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
  // './random',
  // './isValid',
  // './isValidCidr',
  './from',
  './fromBuffer',
  './fromString',
  './fromBigInt',
  // './bigIntToBuffer',
  // './bufferToBigInt',
  // './version',
  // './family',
  './fromCidr',
  // './cidrVersion',
  './fromPrefixLength'
], {})
