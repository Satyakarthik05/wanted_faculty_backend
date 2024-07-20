const express =require('express');
const faculty = require('../models/faculty');
const collegePosts=require('../models/collegePosts');
const applications =require('../models/applications');



const Application = async (req,res)=> {
    const {Organization,facultyName,facultyEmail,postId,facultyId}=req.body;

    try {
        const application = await faculty.findById(req.facultyId);
        const collegePost = await collegePosts.findOneAndUpdate({Organization:Organization});

        if(!application){
            return res.status(400).json({message:"Faculty not found"});
        }

        const apply = new applications({
            Organization,postId,facultyName:application.Name,facultyEmail:application.email,facultyId:application._id
        })


        const applicant = await apply.save();

        collegePost.Applicants.push(application);
        application.appliedOrganization.push(collegePost);

        await collegePost.save();
        await application.save();


        res.status(200).json(apply)


    } catch (error) {
        console.log(error);
    }
}



module.exports={Application};