const express = require('express');
const Organization = require('../models/College');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const otpAuthentication = async (req, res) => {
    const { Emails } = req.body;

    try {
        const mail = await Organization.findOne({ email: Emails });

        if (!mail) {
            return res.status(400).json({ message: "Faculty email not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        mail.resetPassword = otp;
        await mail.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "maheshvengala4321@gmail.com",
                pass: "jzsj shzc lhlw wury"
            }
        });

        const mailOptions = {
            from: "maheshvengala4321@gmail.com",
            to: Emails,
            subject: "Password Reset for Faculty Seeker",
            text: `OTP for password reset: ${otp}`
        };

        await transporter.sendMail(mailOptions);

        console.log('OTP sent successfully');
        return res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
}



const resetPassword =async(req,res)=> {
    const {Emails,OTP,newPassword} =req.body;


    try {
        const facultypass = await Organization.findOne({email:Emails});

        if(!facultypass || facultypass.resetPassword!==OTP){
            return res.status(400).json({message:"faculty not found or invalid otp"});
        }
        const hashpass = await bcrypt.hash(newPassword,10);

        facultypass.password= hashpass;
        facultypass.save();
        res.status(200).json({message:"Password reset successfully"});


    } catch (error) {
        console.log(error);
    }
}

module.exports={otpAuthentication,resetPassword};