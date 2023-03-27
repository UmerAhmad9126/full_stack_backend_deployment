const express = require('express');
const { UserModel } = require('../Models/UserModel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { emailValidator } = require('../Middleware/emailValidator');
const userRoter = express.Router();


const saltRounds = 5;



//registration
userRoter.post("/register", emailValidator, async (req, res) => {
    const { email, pass, location, age } = req.body;
    try {
        bcrypt.hash(pass, saltRounds, async (err, hash) => {
            const user = new UserModel({ email, pass: hash, location, age });
            await user.save();
            res.status(200).send({ msg: "Register Success" });
        });
    } catch (error) {
        res.status(400).send({ msg: "Register Fail" });
    }
});



//login("authentication")
userRoter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        // console.log('user:', user)
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    res.status(200).send({
                        msg: "Login Success", "token": jwt.sign({ "userID": user._id }, 'masai')
                    });
                }
                else {
                    res.status(400).send({ msg: "Wrong credentials" });
                }
            });
        }
        else {
            res.status(400).send({ msg: error.message });
        }
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
});


module.exports = {
    userRoter
}