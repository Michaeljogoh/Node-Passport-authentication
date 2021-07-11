const  express = require('express'),
 app=express();

// initialize express module
app.use(express.urlencoded({extended:true}));


app.get("/" , (req , res) =>{
    res.sendFile(__dirname + "/fill.html");
})

app.get("/booking" , (req , res)=>{
    res.sendFile(__dirname+ "/booking.html");
})

app.post("/booking" , (req , res)=>{
    var fullname= req.body.fname;
    var date=req.body.date;
    var treatment = req.body.treatment;
    var dateReg = new Date();
    var gender = req.body.sex;
    res.write("<html> Welcome<h1>"+ fullname + "</h1> to Dayspa Center")
    res.write("Your registration was succesfull");
    res.write("<h3> Your registration details are as follows</h3>");
    res.write("you registered on:" + dateReg);
})

app.post("/" , (req , res)=>{
    var firstname = req.body.fname;
    var lastname = req.body.sname;
    var gender = req.body.gender;
    res.write("<html> <h1>" +firstname+ " "+lastname+ "</h1>");
    res.write("Refistration sucesful </html>");
    
})

app.listen(3000 , ()=>{
    console.log("Server started at 3000");
})