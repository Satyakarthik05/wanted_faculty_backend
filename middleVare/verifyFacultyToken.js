const Faculty = require('../models/faculty')
const jwt = require('jsonwebtoken');

secret ="Satya12@";


const verifyToken = async (req, res, next)=>{
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }
    try {
        const decoded = jwt.verify(token, secret)
        const faculty = await Faculty.findById(decoded.facultyId);
        if(!faculty){
            return res.status(404).json({error:"faculty not found"});
        }
        req.facultyId=faculty._id;

        next()

    } catch (error) {
        console.error(error)
        return res.status(500).json({error:"Invalid Token"});
    }
}
module.exports =verifyToken;