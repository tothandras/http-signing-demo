process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const fs = require('fs')
const httpSignature = require('http-signature')
const rp = require('request-promise')

const key = fs.readFileSync('./rsa', 'ascii')

var options = {
  uri: 'https://localhost:8443/',
  method: 'GET',
  headers: {},
  httpSignature: {
    key: key,
    keyId: './rsa.pub'
  }
}

rp(options)
  .then(console.log)
  .catch(console.error)
