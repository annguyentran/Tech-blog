const router = require('express').Router();
const homeroutes = require('./homeroutes');
const profileroutes = require('./profileroutes');
router.use("/",homeroutes); 
router.use("/profile",profileroutes);
module.exports = router