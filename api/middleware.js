const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../secret")
const Auth = require("./auth/auth-model")

const isAuthorized = (req, res, next) => {
  const token = req.headers.authorization

  if(!token) {
    res.status(401).json("token required")
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if(err) {
        res.status(401).json("token invalid")
      } else {
        req.decodedToken = decoded
        next();
      }
    })
  }
}

const validLoginRequest = async (req, res, next) => {
  if(!req.body.email || !req.body.password) {
    res.status(401).json("email and password required")
  } else {
    const checkExists = await Auth.getUserByEmail(req.body.email)
    if(checkExists.length > 0) {
      res.status(401).json("email taken")
    } else {
      next()
    }
  }
}

module.exports = {
  isAuthorized,
  validLoginRequest
}