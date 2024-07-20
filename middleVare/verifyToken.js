const College = require('../models/College');
const jwt = require('jsonwebtoken');
const faculty = require('../models/faculty');

secret ="Satya12@";


const verifyToken = async (req, res, next)=>{
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }
    try {
        const decoded = jwt.verify(token, secret)
        const college = await faculty.findById(decoded.collegeId);
        if(!college){
            return res.status(404).json({error:"college not found"});
        }
        req.collegeId=college._id

        next()

    } catch (error) {
        console.error(error)
        return res.status(500).json({error:"Invalid Token"});
    }
}
module.exports =verifyToken;