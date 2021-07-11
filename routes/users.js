const express = require('express'),
app = express(),
router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const passport = require('passport');



router.get("/register", (req,res)=>{

    res.render("register")
})

router.post("/register", (req,res)=>{
    const {name, email, password, password2, date}= req.body;
    let errors = [];
 
    
    if(!name || !email || !password || !password2){
        errors.push({msg: "Please fill in all fields"})
    }
 
    if(password !== password2){
        if(errors.length>0){
        errors.push({msg:"Passwords do not match"})
    }
 
    if(password< 6){
        errors.push({msg:"Password must not be less than six characters"})
    }
 
     res.render('register',{
         errors,
         name,
         email,
         password,
         password2
     });
    }else{
        //Validation passed
        User.findOne({email:email})
        .then(user =>{
            if(user){
                //User exists
                errors.push({msg:'Email is already registered'})
                res.render('register',{
                 errors,
                 name,
                 email,
                 password,
                 password2
             });
 
            }else{
 
             const newUser = new User({name, email, password,date});
            
             //Hash Password
 
             bcrypt.genSalt(10, (err,salt)=>
                 bcrypt.hash(newUser.password, salt, (err,hash)=>{
                     if(err) throw err;
                  
                     newUser.password = hash;
                     
                     //save user
 
                     newUser.save()
                     .then(user => {
                         //req.flash('success_msg', 'You are now registered and can log in')
                         res.redirect('login')
                     })
                     .catch(err => console.log(err))
             }))
 
            }
        });
    }   
 })

 //login handle
router.post("/login", (req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next);
    req.flash('success_msg', 'You are logged in');
});

//logout handle

router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success_msg', 'You are logged Out');
    req.redirect('/users/login')
});



router.get("/login", (req,res)=>{
    res.render("login")
})

module.exports=router
