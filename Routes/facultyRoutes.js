const express = require('express');
const { facultySign, facultyModify, facultyLogin, filterPosts, myApplications, getDetails, upload } = require('../Controllers/facultyController');
const resetPassword = require('../Controllers/forgetpasswordController');
const FacultyToken = require('../middleVare/verifyFacultyToken');

const router = express.Router();

router.post('/facultySign', facultySign);
router.put('/facultymodify', upload.single('Resume'), FacultyToken, facultyModify);
router.post('/facultyLogin', facultyLogin);
router.get('/postFilter/:post?', filterPosts);
router.get('/mydetails', FacultyToken, getDetails);
router.get('/myapplications',FacultyToken,myApplications);
router.post('/resetpass', resetPassword.otpAuthentication);
router.post('/verifyotp', resetPassword.resetPassword);

module.exports = router;
