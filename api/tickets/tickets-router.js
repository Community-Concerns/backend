const router = require("express").Router()
const Ticket = require("./tickets-model"); 


//middleware
const { accessToDetails } = require("../middleware"); 


router.post("/", [accessToDetails],  async (req, res) => {


    try {

        const { title, description, zipcode } = req.body; 

        if(!title || !description || !zipcode) return res.status(200).json("Need a title, description, and zipcode"); 

        // assign ticket to who ever is signed in
        const newTicket = { user_id: req.userId, title, description, zipcode}; 

        const insertedTicket = await Ticket.create(newTicket); 

        res.status(201).send(insertedTicket); 


    }catch(e){
        res.status(500).send(e.message); 
    }
})

// get all tickets created by user
router.get("/my_tickets", [accessToDetails], async (req, res) => {
    try {

        //return tickets that belong to the user logged in only
        const tickets = await Ticket.getUserTickets(req.userId); 

        if(!tickets) return res.status(200).send("No tickets found."); 

        res.send(tickets); 


    }catch(e){
        res.status(500).send(e.message); 
    }
})



//get all tickets in db
router.get("/", async (req, res) => {



    try {

        const tickets = await Ticket.getAllTickets(); 

        res.status(200).send(tickets); 


    }catch(e){
        res.status(500).send(e.message); 
    }
})

// edit a ticket 
router.put("/:id", [accessToDetails], async (req, res) => {
    try {

        //check if ticket belongs to user
        const [ticket] = await Ticket.getUserTicketById(req.params.id); 

        if(req.userId !== ticket.user_id) return res.json("does not belong to you"); 

        const updatedTicket = await Ticket.update(req.body, req.params.id); 

        res.status(200).json(updatedTicket);



    }catch(e){
        res.status(500).send(e.message); 
    }
})


// delete a ticket by its id
router.delete("/:id", [accessToDetails], async (req, res) => {
    try {

        //check if ticket belongs to user
        const [ticket] = await Ticket.getUserTicketById(req.params.id); 

        if(req.userId !== ticket.user_id) return res.json("does not belong to you"); 

        await Ticket.remove(req.params.id);

        res.status(200).json("Ticket Deleted Successfully")


    }catch(e){
        res.status(500).send(e.message); 
    }
})

module.exports = router