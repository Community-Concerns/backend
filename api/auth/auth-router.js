const router = require("express").Router()
const bcryptjs = require("bcryptjs")
const Auth = require("./auth-model")
const { makeToken } = require("./auth-helpers")
const { isValid } = require("../middleware")


router.post("/register", isValid, async (req, res) => {
  const credentials = req.body
  const rounds = 10
  const hash = bcryptjs.hashSync(credentials.password, rounds)
  credentials.password = hash
  try {
    const newUser = await Auth.addUser(credentials)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json("Error in try block")
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
        message: `welcome, ${user.email}`,
        token
      })
    } else {
      res.status(401).json("invalid credentials")
    }
  }
})

router.delete("/delete-user/:id", async (req, res) => {
  
})

module.exports = router