const express = require('express'),
app = express();
const expressLayout = require('express-ejs-layouts');

const mongoose = require ('mongoose');
const session = require("express-session"),
flash = require('connect-flash');
const passport = require('./config/passport');
const bcrypt = require('bcrypt');
// DB config

require('./config/passport')(passport);
 

// Connect to mongodb
 mongoose.connect("mongodb://localhost:27017/thepassportDB", {useNewURIParser:true, useUnifiedTopology: true})
 .then(()=> console.log('Mongo Connected...'))
 .catch(err => console.log(err));

// bodyparser
app.use(express.urlencoded({extended: true}));

//set EJS view
app.set('view engine', 'ejs');
app.use(expressLayout);

//flash
app.use(flash());

//express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))
  // passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

// setting global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('successs_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next()
})




//routes
app.use("/", require("./routes/index"));

app.use("/users", require("./routes/users"));

//set listening port
app.listen(2500, ()=>{
    console.log("server started at port 2500")
})