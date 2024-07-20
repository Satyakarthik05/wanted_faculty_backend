const express = require('express');
const faculty= require('../models/faculty');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const collegePosts = require('../models/collegePosts');


secret="Satya12@";

const storage =multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null.Date.now()+'-'+Path.extname(file.originalname));
    }
})
const upload =multer({storage:storage});


const facultySign = async (req,res)=> {
    const{Name,email,password,UG,PG,PHD,Experience}= req.body;

    

    try {
        const faSign= await faculty.findOne({email:email});
        if(faSign){
            return res.status(400).json({message:"Email already exists"});
        }

        const hashPassword = await bcrypt.hash(password,10);

        const newFaculty = new faculty({
            Name,email,password:hashPassword,UG,PG,PHD,Experience
        })

        await newFaculty.save();
        res.status(200).json({message:"Faculty registration successful"});
        console.log("Registration Success")
    } catch (error) {
        console.log(error)
    }
}


const facultyLogin = async (req,res)=> {
    const {Email,Password}=req.body;

    try {
        const facultys = await faculty.findOne({email:Email});
        if(!facultys || !(await bcrypt.compare(Password,facultys.password))){
            return res.status(400).json({message:"Invalid Username or Password"})
        }

        const token = await jwt.sign({facultyId:facultys._id},secret,{expiresIn:"1h"});

        res.status(200).json({message:"Login Successful",token})
    } catch (error) {
        console.log(error);
    }
}



const facultyModify = async (req, res) => {
    const  {facultyId}  = req.params;
    const { UG, PG, PHD, Experience } = req.body;
  
    try {

      const Resume = req.file?req.file.filename:undefined;
      const facultyUpdate = await faculty.findByIdAndUpdate(
        {_id:facultyId},
        { UG, PG, PHD, Experience, Resume },
      );
  
      if (!facultyUpdate) {
        return res.status(404).json({ message: "Faculty not found" });
      }
  
      res.status(200).json({ message: "Faculty Updated Successfully", faculty: facultyUpdate });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
};


const filterPosts = async (req, res) => {
    const { post } = req.params; 

    try {
        if (post) {
            const find = await collegePosts.findOne({ Branch: post });
            if (find) {
                return res.json(find);
            } else {
                return res.status(400).json({ error: "Post not found" });
            }
        }

        const allPosts = await collegePosts.find();
        res.json(allPosts);
    } catch (error) {
        console.error(error);
    }
};


const myApplications =async(req,res)=> {
    const {organizationId} = req.params;
    
    try {
        const application = await collegePosts.findOne({Applicants:organizationId});

        if(application){
            res.status(200).json(application)
        }
        else{
            res.status(400).json({message:"Organization not found"});
        }
    } catch (error) {
        
        return res.status(400).json({message:"Server error"});
        console.log(error)
    }
}


  
  

module.exports= {facultySign,facultyModify,facultyLogin,filterPosts,myApplications}