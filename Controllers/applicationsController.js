const express =require('express');
const faculty = require('../models/faculty');
const collegePosts=require('../models/collegePosts');
const applications =require('../models/applications');
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "maheshvengala4321@gmail.com",
      pass: "jzsj shzc lhlw wury"
    },
  });



const Application = async (req, res) => {
    const { Organization, facultyName, facultyEmail, postId, facultyId } = req.body;

    try {
        const application = await faculty.findById(req.facultyId);
        if (!application) {
            return res.status(400).json({ message: "Faculty not found" });
        }

        const collegePost = await collegePosts.findOne({ _id: postId }).populate('College');
        if (!collegePost) {
            return res.status(400).json({ message: "College post not found" });
        }

        const apply = new applications({
            Organization,
            postId,
            facultyName: application.Name,
            facultyEmail: application.email,
            facultyId: application._id
        });

        const applicant = await apply.save();

        collegePost.Applicants.push(application._id);
        application.appliedOrganization.push(collegePost._id);

        await collegePost.save();
        await application.save();



        const mailOptions = {
            from: 'maheshvengala4321@gmail.com',
            to: collegePost.College[0].email,
            subject: 'Application Received',
            text: `Dear ${collegePost.College[0].name},\n\nYou have received a new application from ${application.Name} for the post at ${Organization}.\n\nBest regards,\nYour Company Name`,
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
            }
          });

        res.status(200).json(applicant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports={Application};