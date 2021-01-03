const db = require("../../database/dbConfig")

function getUserByEmail(email) {
  return db("users").where({ email })
}

function addUser(user) {
  return db("users").insert(user, "id")
}

async function deleteUser(id) {
  await db("ticket_upvotes").where({ user_id: id }).del()
  await db("comments").where({ user_id: id }).del()
  await db("tickets").where({ user_id: id }).del()
  return await db("users").where({ id: id }).del()
}

module.exports = {
  getUserByEmail,
  addUser,
  deleteUser
}