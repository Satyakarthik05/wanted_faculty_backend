const express = require('express');
const facultyController = require('../Controllers/facultyController');
const resetPassword = require('../Controllers/forgetpasswordController');

const app = express.Router();


app.post('/facultySign',facultyController.facultySign);
app.put('/facultymodify/:facultyId',facultyController.facultyModify);
app.post('/facultyLogin',facultyController.facultyLogin);
app.get('/postFilter/:post?',facultyController.filterPosts);
app.get('/myapplications/:organizationId',facultyController.myApplications);
app.post('/resetpass',resetPassword.otpAuthentication);
app.post('/verifyotp',resetPassword.resetPassword);


module.exports=app;
