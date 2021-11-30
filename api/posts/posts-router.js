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
            message: 'Error retrieving the posts'
        })
    })
})

router.get('/:id', (req, res) => {
    
})

module.exports = router
