const router = require("express").Router()
const Comment = require("./comments-model"); 

// middlewares
const { accessToDetails } = require("../middleware"); 


//creating a comment to a specific ticket, and addding comment to comment db
router.post("/:id", [accessToDetails], async (req, res) => {
    
    try {

        const { comment } = req.body; 

        if(!comment)return res.status(400).json("Please provide a comment"); 

        const newComment = { comment, ticket_id: Number(req.params.id), user_id: req.userId }

        const insertedComment = await Comment.create(newComment);

        res.status(201).send(insertedComment); 

    }
    catch(e){
        res.status(500).send(e.message); 
    }


})

// get specific comments by ticket
router.get("/:id", async (req, res) => {

    try {

        const ticketId = req.params.id; 

        const comments = await Comment.getTicketComments(ticketId); 

        if(!comments) return res.status(400).json("No comments available"); 


        res.status(200).send(comments); 

    }
    catch(e){
        res.status(500).send(e.message); 
    }
})

//editing a comment on a specific ticket
router.put("/:id", [accessToDetails],  async (req, res) => {

    try {

        //check if comment belongs to user
        const [comment] = await Comment.getCommentById(req.params.id); 

        if(req.userId !== comment.user_id) return res.json("this comment does not belong to you")

        const updatedComment = await Comment.update(req.body, req.params.id); 

        res.status(200).send(updatedComment); 

    }catch(e){
        res.status(500).send(e.message); 
    }
})

//deleting a comment on a specific ticket
router.delete("/:id", [accessToDetails],  async (req, res) => {


    try {

        //check if comment belongs to user
        const [comment] = await Comment.getCommentById(req.params.id); 

        if(req.userId !== comment.user_id) return res.json("this comment does not belong to you")

        // if it belongs to user, then you can delete it
        await Comment.remove(req.params.id); 

        res.status(200).json("Comment deleted successfully"); 


    }
    catch(e){
        res.status(500).send(e.message); 
    }


})


module.exports = router