import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(req.body.password, salt);
        const newUser = new User({ username: req.body.username, email: req.body.email, password: hashPassword });
        await newUser.save();
        res.status(200).send("User has been created.");
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const validUser = await User.findOne({ username: req.body.username });
        if (!validUser)
            return next(errorHandler(404, "User not found"));
        const validPass = bcryptjs.compareSync(req.body.password, validUser.password);
        if (!validPass)
            return next(errorHandler(400, "Wrong credentials"));

        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);
        const { password, isAdmin, ...rest } = validUser._doc;
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    } catch (err) {
        next(err);
    }
}
