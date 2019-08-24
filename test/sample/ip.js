const { IPv4, IPv6 } = require('../../src/internal/versions')

module.exports = [
  {
    name: '[ipv4] basics (1)',
    inputString: '126.0.23.1',
    expandedString: '126.0.23.1',
    minimizedString: '126.0.23.1',
    normalizedString: '126.0.23.1',
    bigint: 0x7e001701n,
    buffer: Buffer.from('7e001701', 'hex'),
    type: IPv4
  },
  {
    name: '[ipv4] basics (2)',
    inputString: '240.15.0.255',
    expandedString: '240.15.0.255',
    minimizedString: '240.15.0.255',
    normalizedString: '240.15.0.255',
    bigint: 0xf00f00ffn,
    buffer: Buffer.from('f00f00ff', 'hex'),
    type: IPv4
  },
  {
    name: '[ipv6] basics',
    inputString: 'ef12:2f:23:f345:232:121f:1103:fe3',
    expandedString: 'ef12:002f:0023:f345:0232:121f:1103:0fe3',
    minimizedString: 'ef12:2f:23:f345:232:121f:1103:fe3',
    normalizedString: 'ef12:2f:23:f345:232:121f:1103:fe3', 
    bigint: 0xef12002f0023f3450232121f11030fe3n,
    buffer: Buffer.from('ef12002f0023f3450232121f11030fe3', 'hex'),
    type: IPv6
  },
  {
    name: '[ipv6] ipv4 embedded',
    inputString: 'ef12:2f:23:f345:232:121f:126.0.23.1',
    expandedString: 'ef12:002f:0023:f345:0232:121f:7e00:1701',
    minimizedString: 'ef12:2f:23:f345:232:121f:7e00:1701',
    normalizedString: 'ef12:2f:23:f345:232:121f:7e00:1701', 
    bigint: 0xef12002f0023f3450232121f7e001701n,
    buffer: Buffer.from('ef12002f0023f3450232121f7e001701', 'hex'),
    type: IPv6
  },
  {
    name: '[ipv6] ipv4 mapped range',
    inputString: '::ffff:126.0.23.1',
    expandedString: '0000:0000:0000:0000:0000:ffff:126.0.23.1',
    minimizedString: '::ffff:126.0.23.1',
    normalizedString: '0:0:0:0:0:ffff:126.0.23.1', 
    bigint: 0xffff7e001701n,
    buffer: Buffer.from('00000000000000000000ffff7e001701', 'hex'),
    type: IPv6
  },
  {
    name: '[ipv6] double colon',
    inputString: 'ef12:2f:23::0fe3',
    expandedString: 'ef12:002f:0023:0000:0000:0000:0000:0fe3',
    minimizedString: 'ef12:2f:23::fe3',
    normalizedString: 'ef12:2f:23:0:0:0:0:fe3', 
    bigint: 0xef12002f002300000000000000000fe3n,
    buffer: Buffer.from('ef12002f002300000000000000000fe3', 'hex'),
    type: IPv6
  },
  {
    name: '[ipv6] double colon and ipv4 embedded',
    inputString: 'ef12:2f:23::0fe3:126.0.23.1',
    expandedString: 'ef12:002f:0023:0000:0000:0fe3:7e00:1701',
    minimizedString: 'ef12:2f:23::fe3:7e00:1701',
    normalizedString: 'ef12:2f:23:0:0:fe3:7e00:1701', 
    bigint: 0xef12002f0023000000000fe37e001701n,
    buffer: Buffer.from('ef12002f0023000000000fe37e001701', 'hex'),
    type: IPv6
  },
  {
    name: '[ipv6] double colon at the start',
    inputString: '::1',
    expandedString: '0000:0000:0000:0000:0000:0000:0000:0001',
    minimizedString: '::1',
    normalizedString: '0:0:0:0:0:0:0:1', 
    bigint: 0x00000000000000000000000000000001n,
    buffer: Buffer.from('00000000000000000000000000000001', 'hex'),
    type: IPv6
  },
  {
    name: '[ipv6] double colon at the end',
    inputString: '1234::',
    expandedString: '1234:0000:0000:0000:0000:0000:0000:0000',
    minimizedString: '1234::',
    normalizedString: '1234:0:0:0:0:0:0:0', 
    bigint: 0x12340000000000000000000000000000n,
    buffer: Buffer.from('12340000000000000000000000000000', 'hex'),
    type: IPv6
  },
  {
    name: '[ipv6] only double colon',
    inputString: '::',
    expandedString: '0000:0000:0000:0000:0000:0000:0000:0000',
    minimizedString: '::',
    normalizedString: '0:0:0:0:0:0:0:0', 
    bigint: 0x00000000000000000000000000000000n,
    buffer: Buffer.from('00000000000000000000000000000000', 'hex'),
    type: IPv6
  },
  {
    name: '[ipv6] missplaced double colon',
    inputString: '1::1:0:0:0:1',
    expandedString: '0001:0000:0000:0001:0000:0000:0000:0001',
    minimizedString: '1:0:0:1::1',
    normalizedString: '1:0:0:1:0:0:0:1',
    bigint: 0x10000000000010000000000000001n,
    buffer: Buffer.from('00010000000000010000000000000001', 'hex'),
    type: IPv6
  },
  {
    name: '[ipv6] zero sequence with same length',
    inputString: '1:0:0:1:1:0:0:1',
    expandedString: '0001:0000:0000:0001:0001:0000:0000:0001',
    minimizedString: '1::1:1:0:0:1',
    normalizedString: '1:0:0:1:1:0:0:1',
    bigint: 0x10000000000010001000000000001n,
    buffer: Buffer.from('00010000000000010001000000000001', 'hex'),
    type: IPv6
  },
  {
    name: '[ipv6] zero sequence with same length, missplaced double colon',
    inputString: '1:0:0:1:1::1',
    expandedString: '0001:0000:0000:0001:0001:0000:0000:0001',
    minimizedString: '1::1:1:0:0:1',
    normalizedString: '1:0:0:1:1:0:0:1',
    bigint: 0x10000000000010001000000000001n,
    buffer: Buffer.from('00010000000000010001000000000001', 'hex'),
    type: IPv6
  }
]
