const express = require('express');
const collegeController = require('../Controllers/collegeController');
const verifyToken = require('../middleVare/verifyToken');
const collegeResetpass = require('../Controllers/collegeResetpass')
// const app = express.Router();
const app =express.Router()


app.post('/collegeSignup',collegeController.collegeRegister);
app.post('/collegeLogin',collegeController.collegeLogin);
app.post('/collegeposts',verifyToken,collegeController.collegePosts);
app.get('/myposts/:collegeId',collegeController.getCollegePosts);
app.get('/applicants/:applicantId',collegeController.Applications);
app.post('/collegepassreset',collegeResetpass.resetPassword);
app.post('/collegeotp',collegeResetpass.otpAuthentication);
module.exports=app;

