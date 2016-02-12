const fs = require('fs')
const https = require('https')
const koa = require('koa')
const httpSignature = require('http-signature')

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
}

function *middleware(next) {
  const parsed = httpSignature.parseRequest(this.request)
  const pub = fs.readFileSync(parsed.keyId)
  if (!httpSignature.verifySignature(parsed, pub)) {
    this.trow(401, 'Signature can not be verified')
  }
  this.status = 200
  yield next
}

const app = koa()
app.use(middleware)

https.createServer(options, app.callback())
  .listen(8443)
