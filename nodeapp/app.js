const express = require('express'),
		   ejs = require('ejs'),
		   app = express();






           app.use(express.urlencoded({extended:true}));
           app.use(express.static("public"));
           app.set('view engine', 'ejs');
       



var imageRouter = require('./routes/image-route');
app.use('/', imageRouter);


app.get('/', (req, res)=>{
    res.render('upload-form')
})


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Listening on port  ${port}'));