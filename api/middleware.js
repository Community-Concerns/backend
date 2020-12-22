const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../secret")
const Auth = require("./auth/auth-model")
const Upvotes = require("./upvotes/upvotes-model")

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

const validRegisterRequest = async (req, res, next) => {
  if(!req.body.email || !req.body.username || !req.body.password || !req.body.zipcode) {
    res.status(401).json({ message: "email, username, zipcode and password required" })
  } else {
    const checkExists = await Auth.getUserByEmail(req.body.email)
    if(checkExists.length > 0) {
      res.status(401).json({ message: "email taken" })
    } else {
      next()
    }
  }
}

const validateUpvoteExists = async (req, res, next) => {
  const { id } = req.params
  const checkExists = await Upvotes.getUpvote(id)
  if(checkExists.length > 0) {
    next()
  } else {
    res.status(401).json({ message: "This upvote id does not exist" })
  }
}

const validateUpvoteDoesNotExists = async (req, res, next) => {
  if(!req.body.user_id || !req.body.ticket_id) {
    res.status(401).json({ message: "You must include a user_id and ticket_id in body request"})
  } else {
    const checkExists = await Upvotes.getUpvoteWithUserAndTicketId(req.body)
    if(checkExists.length > 0) {
      res.status(401).json({ message: "This upvote already exists" })
    } else {
      next()
    }
  }
}

module.exports = {
  isAuthorized,
  validRegisterRequest,
  validateUpvoteExists,
  validateUpvoteDoesNotExists
}