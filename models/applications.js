const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    Organization:{
        type:String,
        required:true
    },
    facultyName:{
        type:String,
        required:true
    },
    facultyEmail:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    facultyId:{
        type:String,
        required:true

    }


})


const postModel = mongoose.model('Application',applicationSchema);

module.exports=postModel;