const express = require('express');
const applicationsController = require('../Controllers/applicationsController');
const applicationToken = require('../middleVare/verifyFacultyToken');


const app = express.Router();

app.post('/application',applicationToken,applicationsController.Application);

module.exports=app;