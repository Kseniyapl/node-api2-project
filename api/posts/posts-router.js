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
            message: 'Error retrieving posts'
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
            message: 'Error retrieving the post'
        })
    })
})

module.exports = router
