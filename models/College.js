const mongoose = require('mongoose');


const CollegeSchema = new mongoose.Schema({
    Organization:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    collegePosts:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Posts"
        }
    ],
    resetPassword:{
        type:String
    }

})

const College = mongoose.model('Organization',CollegeSchema)
module.exports= College;

