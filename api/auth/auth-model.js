const db = require("../../database/dbConfig")

function getUserByEmail(email) {
  return db("users").where({ email })
}

function addUser(user) {
  return db("users").insert(user).then(([id]) => {
    return db("users").where({ id })
  })
}

module.exports = {
  getUserByEmail,
  addUser
}