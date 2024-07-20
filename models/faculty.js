const mongoose = require('mongoose');


const facultySchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    UG:[
        {
        yearOfPassing:String,
        percentage:String
        }
    ],
    PG:[
        {
        yearOfPassing:String,
        percentage:String
        }
    ],
    PHD:[
        {
        yearOfPassing:String,
        percentage:String
        }
    ],
    Experience:{
        type:String
    },
    Resume:{
        type:String
    },
    appliedOrganization:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Posts"
        }
    ],
    resetPassword:{
        type:String
    }
    
})

const faculty = mongoose.model('Faculty',facultySchema);
module.exports=faculty;