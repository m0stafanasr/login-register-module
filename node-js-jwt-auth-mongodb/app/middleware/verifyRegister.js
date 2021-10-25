const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {

    // for username
    User.find({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (user) {
            res.status (400).send({message: "Failed! username already registered"});
            return;
        }

        // for email
        User.find({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (user) {
                res.status (400).send({message: "Failed! Email already registered"});
                return;
            }
            next();
        });
    });
};

const verifyRegister = {
    checkDuplicateUsernameOrEmail
};

module.exports = verifyRegister;