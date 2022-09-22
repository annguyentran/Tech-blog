const { response } = require('express');
const User = require('../models/User')
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {

        res.render('profile')
    } catch (error) {
        
    }
})

router.get('/login', async (req, res) => {
    try {
        if(req.session && req.session.login){
            res.redirect('/profile');
        }
        res.render('login')
    } catch (error) {
        
    }
})



router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where:{email: req.body.email}
        })
        if (!user) {
            res.status(400).json({message: 'Wrong email or password'});
            return;
        }
        const validPassword = await user.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({message: 'Wrong email or password'});
            return;
        }
        req.session.save(() => {
            req.session.id = user.id
            req.session.email = user.email
            req.session.login = true 
            res.json({message: 'login successful', user: user})
        })
    } catch (error) {
        
    }

})

router.get('/logout', (req, res) => {
if (req.session && req.session.login){

    req.session.destroy(() => {
       res.redirect('/profile/login');
    })
}

})
module.exports = router

