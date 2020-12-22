const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const AuthRouter = require("./auth/auth-router")
const TicketsRouter = require("./tickets/tickets-router")
const CommentsRouter = require("./comments/comments-router")
const UpvotesRouter = require("./upvotes/upvotes-router")
const { isAuthorized } = require("./middleware")

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

server.use("/api/auth", AuthRouter)
server.use("/api/tickets", isAuthorized, TicketsRouter)
server.use("/api/comments", isAuthorized, CommentsRouter)
server.use("/api/upvotes", UpvotesRouter)

server.get("/", (req, res) => {
  res.status(200).json("You have reached the Community Concerns Server, Welcome!")
})

module.exports = server