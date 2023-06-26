"use strict";

const base64 = require("base-64");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");

module.exports = async (req, res, next) => {
    if (req.headers.authorization) {
        const basicAuthData = req.headers.authorization;
        const splitBasicWord = basicAuthData.split(" ");
        const theAutodecodedOnly = splitBasicWord.pop();
        const decodedData = base64.decode(theAutodecodedOnly);

        const [userName, password] = decodedData.split(":");
        const user = await User.findOne({ where: { userName } });
        const isValid = await bcrypt.compare(password, user.password);

        if (isValid) {
            req.user = user;
            next();
        } else {
            next({ massege: "This user is not Authorized!" });
        }
    } else {
        next({ massege: "Please enter username and the password" });
    }
};
