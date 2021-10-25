const jwt = require("jsonwebtoken");
const verify = require("jsonwebtoken/verify");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;


verifyToken = (req, res, next) => {
    let token = req.header["x-access-token"];

    if (!token) {
        return res.status(403).send({message: "no token provided!"});
    }
    jwt.verify(token, config.sercret, (err, decoded) =>{
        if (err) {
            return res.status(401).send({message: "unauthorized"});
        }
        req.userId = decoded.id;
        next();
    });
}

const authJwt = {
    verifyToken
};
module.exports = authJwt;