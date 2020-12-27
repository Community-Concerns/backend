const db = require("../../database/dbConfig"); 


/* Select
    u.username, 
    c.comment
from [comments] as c
join [users] as u
on c.user_id = u.id;  */

function getTicketComments(id){
    return db("comments as c")
    .join("users", "users.id", "c.user_id")
    .select("users.username", "c.comment")
    .where({ticket_id: id})
}


function getCommentById(id){
    return db("comments").where({ id }); 
}

async function create(comment){
    const newComment = await db("comments").insert(comment); 

    return db("comments as c")
    .join("users", "users.id", "c.user_id")
    .select("users.username as created_by_user", "c.comment", )
    .where("c.id", newComment).first(); 
}

async function update(changes, id){

    await db("comments").where({ id }).update(changes); 

    return db("comments").where({id}).first()
}


function remove(id){
    return db("comments").where({ id }).del(); 
}


module.exports = {
    getTicketComments, 
    getCommentById, 
    create, 
    update, 
    remove
}