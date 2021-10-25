const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        cardNo: req.body.cardNo,
        ccv: bcrypt.hashSync(req.body.ccv, 3)
    })

    user.save((err, user) => {
        if(err) {
            res.status(500).send({message: err});
            return;
        }

        if (req.body.roles) {
            Role.find(
                {
                    name: {$in: req.body.roles}
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    user.roles = roles.map(role => role_id);
                    user.save(err=>{
                        if(err){
                            res.status(500).send({message: err});
                            return;
                        }
                        res.send({message: "user registered successfully!"});
                    });
                }
            );
        } else {
            Role.find({name: "user"}, (err, role) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                user.roles = [role_id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    res.send({message: "user registered successfully"});
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.find({
        username: req.body.username
    })
    .populate("roles", "-__v")
    .exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (!user) {
            return res.status(404).send({message: "user not found"})
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }

          var token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 9000
          });
          var authorities = [];
          for (let i = 0; i < user.roles.length; i++){
              authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
          }
          res.status(200).send({
              id: user_id,
              username: user.username,
              email: user.email,
              cardNo: user.cardNo,
              roles: authorities,
              accessToken: token
          });
    });
};