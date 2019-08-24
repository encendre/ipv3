// RegExp are copy past from: https://github.com/nodejs/node/blob/master/lib/internal/net.js

// Ipv4Segment

const v4Seg = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
const v4Str = `(${v4Seg}[.]){3}${v4Seg}`
const v4Cidr = '(?:[0-9]|[1-2][0-9]|3[0-2])'

const IPv4Reg = new RegExp(`^${v4Str}$`)
const IPv4CidrReg = new RegExp(`^${v4Str}/${v4Cidr}$`)

// IPv6 Segment

const v6Seg = '(?:[0-9a-fA-F]{1,4})'
const v6Str = '(' +
`(?:${v6Seg}:){7}(?:${v6Seg}|:)|` +
`(?:${v6Seg}:){6}(?:${v4Str}|:${v6Seg}|:)|` +
`(?:${v6Seg}:){5}(?::${v4Str}|(:${v6Seg}){1,2}|:)|` +
`(?:${v6Seg}:){4}(?:(:${v6Seg}){0,1}:${v4Str}|(:${v6Seg}){1,3}|:)|` +
`(?:${v6Seg}:){3}(?:(:${v6Seg}){0,2}:${v4Str}|(:${v6Seg}){1,4}|:)|` +
`(?:${v6Seg}:){2}(?:(:${v6Seg}){0,3}:${v4Str}|(:${v6Seg}){1,5}|:)|` +
`(?:${v6Seg}:){1}(?:(:${v6Seg}){0,4}:${v4Str}|(:${v6Seg}){1,6}|:)|` +
`(?::((?::${v6Seg}){0,5}:${v4Str}|(?::${v6Seg}){1,7}|:))` +
')(%[0-9a-zA-Z]{1,})?'
const v6Cidr = '(?:[0-9]{1,2}|1[0-1][0-9]|12[0-8])'

const IPv6Reg = new RegExp(`^${v6Str}$`)
const IPv6CidrReg = new RegExp(`^${v6Str}/${v6Cidr}$`)

module.exports = {
  IPv4Reg,
  IPv4CidrReg,
  IPv6Reg,
  IPv6CidrReg
}
