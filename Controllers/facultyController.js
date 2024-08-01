const express = require('express');
const faculty= require('../models/faculty');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const collegePosts = require('../models/collegePosts');
const path = require('path');


secret="Satya12@";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });


const facultySign = async (req,res)=> {
    const{Name,email,password,phone,UG,PG,PHD,Experience}= req.body;

    

    try {
        const faSign= await faculty.findOne({email:email});
        if(faSign){
            return res.status(400).json({message:"Email already exists"});
        }

        const hashPassword = await bcrypt.hash(password,10);

        const newFaculty = new faculty({
            Name,email,password:hashPassword,phone,UG,PG,PHD,Experience
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

        const token = await jwt.sign({facultyId:facultys._id},secret, { expiresIn: '1h' });

        res.status(200).json({message:"Login Successful",token})
    } catch (error) {
        console.log(error);
    }
}

const getDetails = async (req,res)=> {
    try {
        const facultyDetails = await faculty.findById(req.facultyId)
        if(!facultyDetails){
            return res.status(200).json({message:"Faculty not found"});
        }
        else{
            res.status(200).json(facultyDetails);
        }
    } catch (error) {
        console.log(error);
    }
}



const facultyModify = async (req, res) => {
    const { UG, PG, PHD, Experience } = req.body;
    const facultyId = req.facultyId;
  
    try {
      const Resume = req.file ? req.file.filename : undefined;
  
      const parsedUG = UG ? JSON.parse(UG) : undefined;
      const parsedPG = PG ? JSON.parse(PG) : undefined;
      const parsedPHD = PHD ? JSON.parse(PHD) : undefined;
  
      const facultyUpdate = await faculty.findByIdAndUpdate(
        facultyId,
        { UG: parsedUG, PG: parsedPG, PHD: parsedPHD, Experience, Resume },
        { new: true }
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
            const find = await collegePosts.find({ Branch: post }).populate('College');
            if (find) {
                return res.json(find);
            } else {
                return res.status(400).json({ error: "Post not found" });
            }
        }

        const allPosts = await collegePosts.find().populate('College');
        res.json(allPosts);
    } catch (error) {
        console.error(error);
    }
};


const myApplications =async(req,res)=> {
    // const {organizationId} = req.params;
    const facultyId = req.facultyId;
    
    try {
        const application = await collegePosts.find({Applicants:facultyId});

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


  
  

module.exports= {facultySign,facultyModify,facultyLogin,filterPosts,myApplications,getDetails,upload}