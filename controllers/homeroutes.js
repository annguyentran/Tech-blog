const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User]
        });
        console.log(postData);
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage',{posts})
    } catch (error) {
        
    }
})

















module.exports = router