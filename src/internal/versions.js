const IPv4 = Symbol('IPv4')
const IPv6 = Symbol('IPv6')

/**
 * @enum {Symbol} IpType
 */

const IpType = {
  /** IPv4 protocol */
  IPv4,

  /** IPv6 protocol */
  IPv6
}

const versions = {
  IPv4,
  IPv6,
  [IPv4]: IPv4,
  [IPv6]: IPv6,
  ipv4: IPv4,
  ipv6: IPv6
}

function _normalize (v) {
  if (!v) return undefined

  if (v.constructor === String) v = v.toLowerCase()

  return versions[v]
}

function _size (v) {
  switch (v) {
    case IPv4:
      return 4
    case IPv6:
      return 16
    default:
      throw new TypeError('Invalid type, should be IPv4 or IPv6')
  }
}

function _bitsize (v) {
  return _size(v) * 8
}

function _sizeToVersion (n) {
  switch (n) {
    case 4:
      return IPv4
    case 16:
      return IPv6
    default:
      throw new TypeError('Invalid type, should be IPv4 or IPv6')
  }
}

module.exports = Object.assign({ _normalize, _size, _bitsize, _sizeToVersion }, versions)
