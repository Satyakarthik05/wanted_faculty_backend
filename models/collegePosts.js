const mongoose = require('mongoose');



const collegepostSchema = new mongoose.Schema({
    Organization:{
        type:String,
        required:true
    },
    Branch:{
        type:String,
        required:true
    },
    Experience:{
        type:String
    },
    Designation:{
        type:[
            {
            type:String,
            enum:['UG','PG','PHD']
            },
        ]
    },
    Nofopenings:{
        type:String
    },
    Salary:{
        type:String
    },
    College:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Organization"
        }
    ],
    Applicants:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Faculty"
        }
    ]
})

const collegePost = mongoose.model('Posts',collegepostSchema)
module.exports= collegePost;