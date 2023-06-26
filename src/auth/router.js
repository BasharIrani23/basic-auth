"use strict";

const express = require("express");
const { User } = require("./models/index");
const router = express.Router();

const bcrypt = require("bcrypt");
const basicAuth = require("./middleware/basic");

router.post("/signup", userSignUp);
router.post("/signin", basicAuth, userSignIn);

async function userSignUp(req, res) {
    const { userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await User.create({
        //to save it in the database
        userName: userName,
        password: hashedPassword,
    });
    res.status(201).json(newUser);
}

function userSignIn(req, res) {
    res.status(200).json({
        user: req.user,
    });
}

module.exports = router;
