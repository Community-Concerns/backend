const db = require("../../database/dbConfig")

function getUserByEmail(email) {
  return db("users").where({ email })
}

async function addUser(user) {
  const [id] = await db("users").insert(user)
  return db("users").where({ id: id })
}

module.exports = {
  getUserByEmail,
  addUser
}