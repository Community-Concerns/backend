const db = require("../../database/dbConfig"); 

function getUserTickets(id){
    return db("tickets").where({user_id: id}); 
}

function getAllTickets(){
    return db("tickets"); 
}

function getUserTicketById(id){
    return db("tickets").where({ id }); 
}

async function create(ticket){
    const newTicket = await db("tickets").insert(ticket); // this is an id
    return db("tickets as t")
    .join("users as u", "t.user_id", "u.id")
    .select("u.username as created_by_user", "t.title", "t.description", "t.zipcode")
    .where("t.id", newTicket).first(); 
}

async function update(changes, id){
    await db("tickets").where({ id }).update(changes);
    return db("tickets").where({ id })
}

function remove(id){
    return db("tickets").where({ id }).first().del(); 
}

module.exports = {
    getUserTickets,
    getUserTicketById,  
    getAllTickets, 
    create, 
    update, 
    remove
}