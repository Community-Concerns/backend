const router = require("express").Router()
const bcryptjs = require("bcryptjs")
const nodemailer = require("nodemailer")
const Auth = require("./auth-model")
const { makeToken } = require("./auth-helpers")
const { validRegisterRequest } = require("../middleware")
const e = require("express")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
})

router.post("/register", validRegisterRequest, async (req, res) => {
  const credentials = req.body
  const rounds = 10
  const hash = bcryptjs.hashSync(credentials.password, rounds)
  credentials.password = hash
  try {
    const newUser = await Auth.addUser(credentials)
    if (newUser) {
      const mailOptions = {
        from: 'communityconcernsapp@gmail.com',
        to: credentials.email,
        subject: 'Thank You For Registering With Community Concerns',
        html: '<h1>Welcome to Community Concerns to log in please Click Here</a></h1>'
      }
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
        } else {
          console.log(`Email sent: ${info.response}`)
        }
      })
      res.status(201).json(newUser)
    } else {
      res.status(500).json("Unable to add user")
    }
    
  } catch (error) {
    res.status(500).json({ error: error.lineNumber, message: error.message, stack: error.stack })
  }
})

router.post("/login", async (req, res) => {
  if(!req.body.email || !req.body.password) {
    res.status(401).json("email and password required")
  } else {
    const [user] = await Auth.getUserByEmail(req.body.email)
    if(user && bcryptjs.compareSync(req.body.password, user.password)) {
      const token = makeToken(user)
      
      res.status(200).json({
        message: `welcome, ${user.username}`,
        token
      })
    } else {
      res.status(401).json("invalid credentials")
    }
  }
})

module.exports = router