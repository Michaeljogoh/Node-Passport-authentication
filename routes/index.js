const express = require('express'),
app = express(),
router = express.Router();

const {ensureAuthenticated} = require('../config/auth')

router.get("/", (req,res)=>{
    res.render('welcome')
})

router.get("/dashboard", ensureAuthenticated, (req,res)=>{
    res.render('dashboard')
   

})

module.exports=router
