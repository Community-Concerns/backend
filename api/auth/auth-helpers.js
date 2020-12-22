const { jwtSecret } = require('../../secret')
const jwt = require("jsonwebtoken")

function makeToken(user) {
  // we use a lib called jsonwebtoken
  const payload = {
    subject: user.id,
    email: user.email,
  }
  const options = {
    expiresIn: '900s',
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = {
  makeToken
}