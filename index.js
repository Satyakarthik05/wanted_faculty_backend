const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const cors = require('cors');
const collegeRouter = require("./Routes/collegeRoute");
const facultyRouter = require('./Routes/facultyRoutes');
const applicationRouter= require('./Routes/applicationRoute');


const app =express();
app.use(express.json());
app.use(bodyParser.json());

const corsOptions= {
    origin:['http//:localhost:5173'],
    methods:['POST','GET','DELETE','PUT'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
}

app.use(cors());


mongoose.connect('mongodb+srv://satyakarthikvelivela:Faculty123@facultyseeker.tiwjjjz.mongodb.net/facultySeeker').then(
    ()=> console.log("mongodb Connected Successfully"))
.catch((error) =>console.error());

app.use('/college',collegeRouter);
app.use('/college',collegeRouter);
app.use('/faculty',facultyRouter);
app.use('/apply',applicationRouter);






    



app.listen(3000,()=> {
    console.log("server is running successfully")
})