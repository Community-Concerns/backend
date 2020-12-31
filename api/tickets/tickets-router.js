const router = require("express").Router()
const Ticket = require("./tickets-model"); 
//middleware
const { accessToDetails } = require("../middleware"); 
const { cloudinary } = require("../../utils/cloudinary")

//get all tickets in db
router.get("/", async (req, res) => {
  try {
      const tickets = await Ticket.getAllTickets()
      res.status(200).send(tickets)
  }catch(e){
      res.status(500).send(e.message)
  }
})

// get all tickets created by user
router.get("/my_tickets", accessToDetails, async (req, res) => {
  try {
      //return tickets that belong to the user logged in only
      const tickets = await Ticket.getUserTickets(req.userId)
      if(!tickets) return res.status(200).send("No tickets found.")
      res.send(tickets)
  }catch(e){
      res.status(500).send(e.message); 
  }
})

router.post("/", accessToDetails,  async (req, res) => {
    try {
        const { title, description, zipcode, image } = req.body
        if (!title || !description || !zipcode) return res.status(200).json("Need a title, description, and zipcode")

        const newTicket = { user_id: req.userId, title, description, zipcode}
        // if image is included upload image to cloudinary
        if (image) {
          const uploadedResponse = await cloudinary.uploader.upload(image, {
            upload_preset: "dev_setups"
          })
          newTicket.image = uploadedResponse.public_id
        }
        
        // assign ticket to who ever is signed in
        const insertedTicket = await Ticket.create(newTicket)
        res.status(201).send(insertedTicket)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// edit a ticket 
router.put("/:id", accessToDetails, async (req, res) => {
    try {
        //check if ticket belongs to user
        const [ticket] = await Ticket.getUserTicketById(req.params.id)
        if(req.userId !== ticket.user_id) return res.json("does not belong to you")
        if (req.body.image) {
          const uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
            upload_preset: "dev_setups"
          })
          req.body.image = uploadedResponse.public_id
          // delete old image
          cloudinary.uploader.destroy(ticket.public_id);
        }
        const updatedTicket = await Ticket.update(req.body, req.params.id)
        res.status(200).json(updatedTicket)
    } catch(e){
        res.status(500).send(e.message) 
    }
})

// delete a ticket by its id
router.delete("/:id", accessToDetails, async (req, res) => {
    try {
        //check if ticket belongs to user
        const [ticket] = await Ticket.getUserTicketById(req.params.id)
        if(req.userId !== ticket.user_id) return res.json("does not belong to you")
        await Ticket.remove(req.params.id)
        cloudinary.uploader.destroy(ticket.public_id)
        res.status(200).json("Ticket Deleted Successfully")
    } catch(e) {
        res.status(500).send(e.message)
    }
})

module.exports = router