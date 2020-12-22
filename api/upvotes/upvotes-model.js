const db = require("../../database/dbConfig")

async function addUpvote(upvote) {
  try {
    const id = await db("ticket_upvotes").insert(upvote)
    const newUpvote = await db("ticket_upvotes").where({ id }).first()
    return newUpvote
  } catch (error) {
    console.log(error.message)
  } 
}

async function deleteUpvote(id) {
  try {
    const count = await db("ticket_upvotes").where({ id }).delete()
    return count
  } catch (error) {
    console.log(error.message)
  } 
}

function getUpvote(id) {
  return db("ticket_upvotes").where({ id })
}

function getUpvoteWithUserAndTicketId(upvote) {
  return db("ticket_upvotes").where({ user_id: upvote.user_id, ticket_id: upvote.ticket_id })
}

module.exports = {
  addUpvote,
  deleteUpvote,
  getUpvote,
  getUpvoteWithUserAndTicketId
}