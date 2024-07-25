const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const College = require('../models/College');
const collegePost =require('../models/collegePosts');
const faculty = require('../models/faculty');


secret="Satya12@"


const collegeRegister = async(req,res)=>{
    const {Organization,email,password}= req.body;

    try {
        const emails = await College.findOne({email:email});

        if(emails){
            return res.status(400).json({message:"Email already exists"})
        }
        const hashedPassword= await bcrypt.hash(password,10);

        const newCollege = new College({
            Organization,email,password:hashedPassword
        });
        await newCollege.save();
        res.status(200).json({message:"Organization registration successful"});
        console.log("registration successfull");

    } catch (error) {
        console.log(error)
    }

}


const collegeLogin = async (req,res)=> {
    const{Email,Password}= req.body;

    try {
        const college = await College.findOne({email:Email})

        if(!college || !(await bcrypt.compare(Password,college.password))){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const token = jwt.sign({collegeId:college._id},secret,{expiresIn:"1h"});

        res.status(200).json({message:"Login successful",token})
    } catch (error) {
        console.log(error)
    }
}

const getCollege = async (req,res)=> {
    try {
        const getCollege = await College.findById(req.collegeId);
        if(!getCollege){
            return res.status(400).json({message:"College not found"})
        }
        res.status(200).json(getCollege);
     } catch (error) {
        console.log(error);
    }
}


const collegePosts = async (req,res)=> {
    const {Organization,Branch,Experience,Designation,Nofopenings,Salary}= req.body;

    try {
        const college = await College.findById(req.collegeId);

        if(!college){
            res.status(400).json({message:"collegeid not found"})
        }
        const Post = new collegePost({
            Organization:college.Organization,Branch,Experience,Designation,Nofopenings,Salary,College:college._id
        })

        const collegePosts = await Post.save();

        college.collegePosts.push(collegePosts);
        
        await college.save();

        res.status(200).json(collegePosts);
    



    } catch (error) {
        console.log(error)
    }
}

const getCollegePosts = async (req,res)=>{
    try {

        const Posts = await collegePost.find({College:req.collegeId}).populate('Applicants');

        if(!Posts){
            res.status(400).json({message:"No Posts found"});
        }

        res.status(200).json({Posts})
    } catch (error) {
        console.log(error);
    }


}

const deletePost = async(req,res)=> {
    const {id} = req.params;
    try {
        const getPost = await collegePost.findByIdAndDelete(id);

        if(!getPost){
            return res.status(400).json({message:"Post not found"})
        }

        res.status(200).json({message:"Post deleted successfully"})
    } catch (error) {
        console.log(error);
    }
}


// const Applications = async (req, res) => {
//     const { applicantId } = req.params;

//     try {
//         const job = await collegePost.findById(applicantId);

//         if (job) {
//             res.status(200).json(job);
//         } else {
//             res.status(400).json({ message: "No applied organizations" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server error" });
//     }
// };
const Applications = async (req,res)=>{

    const { applicantId } = req.params;
    try {

        const Posts = await collegePost.findById(applicantId).populate('Applicants');

        if(!Posts){
            res.status(400).json({message:"No Posts found"});
        }

        res.status(200).json({Posts})
    } catch (error) {
        console.log(error);
    }


}


module.exports ={collegeRegister,collegeLogin,collegePosts,getCollegePosts,Applications,deletePost,getCollege}