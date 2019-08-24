/**
 * @class
 * @classdesc Class representing an ip
 * @hideconstructor
 */

const specialsRanges = {
  unspecified:      ['0.0.0.0/8', '::/128'],
  broadcast:        ['255.255.255.255/32'],
  multicast:        ['224.0.0.0/4', 'ff00::/8'],
  linkLocal:        ['169.254.0.0/16', 'fe80::/10',],
  loopback:         ['12.0.0.0/8', '::1/128'],
  carrierGradeNat:  ['100.64.0.0/10'],
  private:          ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'],
  reserved:         ['192.0.0.0/24', '192.0.2.0/24', '192.88.99.0/24',
                     '198.51.100.0/24', '203.0.113.0/24', '240.0.0.0/4 ',
                     '2001:db8::/32'],
  ipv4Mapped:       ['::ffff:0:0/96'],
  rfc6145:          ['::ffff:0:0:0/96'],
  rfc6052:          ['64:ff9b::/96'],
  '6to4':           ['2002::/16'],
  teredo:           ['2001::/32']
}

class Ip {
  type
  _buffer
  _bigint

  constructor (data) {
    throw new Error('Not yet implemented')
  }
}

module.exports = Ip

const statics = require('./statics')
const methods = require('./methods')

Object.assign(Ip, statics)
Object.assign(Ip.prototype, methods)

Ip.done = true