const db = require("../../database/dbConfig")

function getUpvotes() {
  return db("ticket_upvotes")
}

function getUpvote(id) {
  return db("ticket_upvotes").where({ id: id })
}

function getUserUpvotes(user_id) {
  return db("ticket_upvotes").where({ user_id })
}

async function addUpvote(upvote) {
  try {
    const [id] = await db("ticket_upvotes").insert(upvote, "id")
    return await db("ticket_upvotes").where({ id: id }).first()
  } catch (error) {
    console.log(error.message)
  } 
}

async function deleteUpvote(id) {
  try {
    return db("ticket_upvotes").where({ id: id }).delete()
  } catch (error) {
    console.log(error.message)
  } 
}

function getUpvoteWithUserAndTicketId(user_id, ticket_id) {
  return db("ticket_upvotes").where({ user_id, ticket_id })
}

module.exports = {
  addUpvote,
  deleteUpvote,
  getUpvotes,
  getUpvote,
  getUserUpvotes,
  getUpvoteWithUserAndTicketId
}