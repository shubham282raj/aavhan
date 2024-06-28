import { Router } from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const user = Router();

user.post(
  "/register",
  [
    body("name")
      .isString()
      .withMessage("First name must be a string")
      .isLength({ max: 50 })
      .withMessage("First name must be at most 50 characters long")
      .notEmpty()
      .withMessage("First name is required"),

    body("college")
      .isString()
      .withMessage("College must be a string")
      .isLength({ max: 50 })
      .withMessage("College must be at most 50 characters long")
      .notEmpty()
      .withMessage("College is required"),

    body("coursePursuing")
      .isString()
      .withMessage("Course Pursuing must be a string")
      .isLength({ max: 50 })
      .withMessage("Course Pursuing must be at most 50 characters long")
      .notEmpty()
      .withMessage("Course Pursuing is required"),

    body("yearOfStudy")
      .isString()
      .withMessage("Year of Study must be a string")
      .isIn(["1st year", "2nd year", "3rd year", "4th year", "5th year"])
      .withMessage(
        "Year of Study must be one of the following: 1st year, 2nd year, 3rd year, 4th year, 5th year"
      )
      .notEmpty()
      .withMessage("Year of Study is required"),

    body("email")
      .isEmail()
      .withMessage("Email must be a valid email address")
      .isLength({ max: 50 })
      .withMessage("Email must be at most 50 characters long")
      .notEmpty()
      .withMessage("Email is required"),

    body("phoneNumber")
      .isMobilePhone()
      .withMessage("Phone Number must be a valid mobile phone number")
      .notEmpty()
      .withMessage("Phone Number is required"),

    body("address")
      .isString()
      .withMessage("Address must be a string")
      .isLength({ max: 50 })
      .withMessage("Address must be at most 50 characters long")
      .notEmpty()
      .withMessage("Address is required"),

    body("password")
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 8, max: 16 })
      .withMessage("Password must be between 8 and 16 characters long")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors
        .array()
        .map((error) => `${error.msg}`)
        .join(", ");
      return res.status(400).send({ message: errorMessage });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        return res.status(400).send({ message: "User already exists" });
      }

      req.body.isAdmin = false;
      user = new User(req.body);
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).send({ message: "User registered successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  }
);

export default user;
