const { _size } = require('./versions')
const { IPv4Reg } = require('./regexps')

function parseString (string, type) {
  const size = _size(type)

  const buffer = Buffer.alloc(size)

  const [loAddr, hiAddr] = string.split('::').reverse()

  const hiSegments = !hiAddr ? [] : hiAddr.split(':')
  const loSegments = !loAddr ? [] : loAddr.split(':')

  const ipv4Embedded = IPv4Reg.test(loSegments[loSegments.length - 1])
    ? loSegments.pop()
    : undefined

  const loStarts = (size - 2 * loSegments.length - (ipv4Embedded ? 4 : 0))

  let i = 0
  for (const segment of hiSegments) {
    const word = parseInt(segment, 16)

    buffer[i++] = word >> 8
    buffer[i++] = word & 0xff
  }

  i = loStarts

  for (const segment of loSegments) {
    const word = parseInt(segment, 16)

    buffer[i++] = word >> 8
    buffer[i++] = word & 0xff
  }

  if (ipv4Embedded) {
    const segments = ipv4Embedded.split('.')

    buffer[i++] = parseInt(segments[0], 10)
    buffer[i++] = parseInt(segments[1], 10)
    buffer[i++] = parseInt(segments[2], 10)
    buffer[i++] = parseInt(segments[3], 10)
  }

  return buffer
}

module.exports = parseString
