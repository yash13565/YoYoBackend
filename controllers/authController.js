import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import user from "../models/user.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new user({
     ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been succesfully registered.");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const loggedInUser = await user.findOne({
      username: req.body.username,
    });

    if (!loggedInUser) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      loggedInUser.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: loggedInUser._id, isAdmin: loggedInUser.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherdetails } = loggedInUser._doc;

    res.cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details:{...otherdetails} , isAdmin});
  } 
  catch (error) {
    next(error);
  }
};
