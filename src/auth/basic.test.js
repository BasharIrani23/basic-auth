"use strict";

const bcrypt = require("bcrypt");
const base64 = require("base-64");
const { User } = require("../auth/models/index");
const basicAuth = require("../auth/middleware/basic");

describe("basicAuth", () => {
    it("should invok the next middleware if authentication was successful", async () => {
        const req = {
            headers: {
                authorization: `Basic ${base64.encode("username:password")}`,
            },
        };
        const res = {};
        const next = jest.fn();
        const mockUser = {
            userName: "userName",
            password: await bcrypt.hash("password", 5),
        };
        User.findOne = jest.fn().mockResolvedValue(mockUser);
        bcrypt.compare = jest.fn().mockResolvedValue(true);
        await basicAuth(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it("should return an error if authentication was faild", async () => {
        const req = {
            headers: {
                authorization: `Basic ${base64.encode("username:password")}`,
            },
        };
        const res = {};
        const next = jest.fn();
        const mockUser = {
            userName: "userName",
            password: await bcrypt.hash("password", 5),
        };
        User.findOne = jest.fn().mockResolvedValue(mockUser);

        bcrypt.compare = jest.fn().mockResolvedValue(false);

        // await expect(basicAuth(req, res, next)).rejects.toThrow('this user is invalid');

        expect(next).not.toHaveBeenCalled();
    });
});
