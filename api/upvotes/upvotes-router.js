const router = require("express").Router()
const Upvotes = require("./upvotes-model")
const { validateUpvoteExists, validateUpvoteDoesNotExists } = require("../middleware")

router.post("/upvote", validateUpvoteDoesNotExists, async (req, res) => {
  try {
    const upvote = await Upvotes.addUpvote(req.body)
    res.status(201).json(upvote)
  } catch (error) {
    res.status(500).json({ message: "Unable to process request"})
  }
})

router.delete("/upvote/:id", validateUpvoteExists, async (req, res) => {
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