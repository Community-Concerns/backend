const router = require("express").Router()
const Upvotes = require("./upvotes-model")
const { validateUpvoteExists, validateUpvoteDoesNotExists } = require("../middleware")


router.get("/", async (req, res) => {
  try {
    const upvotes = await Upvotes.getUpvotes()
    res.status(201).json(upvotes)
  } catch (error) {
    res.status(500).json({ message: "Unable to get upvotes"})
  }
})

router.get("/my_upvotes", async (req, res) => {
  try {
    const upvotes = await Upvotes.getUserUpvotes(req.decodedToken.subject)
    res.status(201).json(upvotes)
  } catch (error) {
    res.status(500).json({ message: "Unable to get upvotes"})
  }
})

router.post("/", validateUpvoteDoesNotExists, async (req, res) => {
  try {
    req.body.user_id = req.decodedToken.subject
    const upvote = await Upvotes.addUpvote(req.body)
    res.status(201).json(upvote)
  } catch (error) {
    res.status(500).json({ message: "Unable to process request"})
  }
})

router.delete("/:id", validateUpvoteExists, async (req, res) => {
  const { id } = req.params
  try {
    const deletedUpvote = await Upvotes.deleteUpvote(id)
    if(deletedUpvote > 0) {
      res.status(200).json({ message: "Upvote deleted" })
    } else {
      res.status(400).json({ message: "Could not delete upvote"})
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting upvote from server" })
  }
})

module.exports = router