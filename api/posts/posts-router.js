const express = require('express')
const router = express.Router()
const Post = require('./posts-model')

router.get('', (req, res) => {
    Post.find()
    .then(posts=>{
        res.status(200).json(posts)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            message: 'Error retrieving posts',
            error: err.message
        })
    })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            message: 'Error retrieving the post',
            error: err.message
        })
    })
})

router.post('', async(req, res)=>{
 try{
    if(!req.body.title||!req.body.contents){
        res.status(400).json({
            message: "Please provide title and contents for the post" 
        })
    }else{
        const newPost = await Post.insert(req.body)
            res.status(201).json(newPost)
    }
 }catch(err){
    res.status(500).json({
        message:"There was an error while saving the post to the database",
        error: err.message
    })
 }
})

router.put("/:id", (req, res) =>{
const changes = req.body;
    Post.update(req.params.id, changes)
    .then(post=>{
        if(!req.body.title||!req.body.contents){
            res.status(400).json({message: "Please provide title and contents for the post"  }) 
        }if(!req.body.id){
            res.status(404).json({ message: "The post with the specified ID does not exist" })   
         }else{
            res.status(200).json(post)  
        }
    })
    .catch(err =>{
    console.log(err)
        res.status(500).json({
            message: "The post information could not be modified",
            error: err.message
        });
    });
})
router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(count =>{
    if(!count){
        res.status(404).json({ message: "The post with the specified ID does not exist" }); 
        }
    else{
        res.status(200).json({ message: 'Post has been deleted',  }); 
        }
    })
    .catch(err =>{
    console.log(err)
    res.status(500).json({
        message: "The post could not be removed",
        error: err.message})
    })
})

router.get('/:id/comments', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if (!post) {
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
      } else {
          const comments = await Post.findPostComments(req.params.id)
        res.status(200).json(comments)
      }
    } catch (err) {
      res.status(500).json({
        message: "The comments information could not be retrieved",
        error: err.message
      })
    }
  });
  

module.exports = router
