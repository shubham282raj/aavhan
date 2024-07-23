import { Router } from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth.js";
import { githubUpload, uploadMulter } from "../middleware/fileUpload.js";
import { optStorage } from "./mail.js";

const user = Router();

user.get("/admin/all-users", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.cookie("auth_token", "", {
        expires: new Date(0),
      });
      return res.status(404).send({ message: "Forced Logout: User Not Found" });
    }

    if (user.admin != true) {
      return res
        .status(404)
        .send({ message: "You might not have permissions to this route" });
    }

    const users = await User.find({}).select("-password");

    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
});

user.post("/admin/verify-task", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.cookie("auth_token", "", {
        expires: new Date(0),
      });
      return res.status(404).send({ message: "Forced Logout: User Not Found" });
    }

    if (user.admin != true) {
      return res
        .status(404)
        .send({ message: "You might not have permissions to this route" });
    }

    const caUser = await User.findById(req.body.caID);

    if (!caUser) {
      return res.status(404).send({ message: "CA not found" });
    }

    const task = caUser.tasksCompleted[req.body.taskID].find(
      (task) => task.url === req.body.taskURL
    );
    if (!task) {
      return res.status(404).send({ message: "Task URL not found" });
    }
    task.verified = req.body.status;

    caUser.markModified(`tasksCompleted.${req.body.taskID}`);
    await caUser.save();

    console.log(caUser.tasksCompleted);

    res.status(200).send({ message: "Update Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
});

user.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      res.cookie("auth_token", "", {
        expires: new Date(0),
      });
      return res.status(404).send({ message: "Forced Logout: User Not Found" });
    }

    return res.status(200).send({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
});

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

      user = new User(req.body);
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
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

user.post(
  "/addUserTask",
  verifyToken,
  uploadMulter.single("file"),
  [
    body("taskID")
      .isString()
      .withMessage("taskID must be string")
      .notEmpty()
      .withMessage("taskID missing"),
    body("filename")
      .isString()
      .withMessage("File Name must be string")
      .notEmpty()
      .withMessage("File Name missing")
      .isLength({ max: 30 })
      .withMessage("File Name must not be more than 30 characters"),
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
      let user = await User.findById(req.userId);
      if (!user) {
        return res.status(400).send({ message: "User does not exist" });
      }

      const url = await githubUpload(req.file);

      if (!user.tasksCompleted) {
        user.tasksCompleted = {};
      }
      if (user.tasksCompleted[req.body.taskID]) {
        user.tasksCompleted[req.body.taskID].push({
          filename: req.body.filename,
          url,
          verified: "Pending",
        });
      } else {
        user.tasksCompleted[req.body.taskID] = [
          { filename: req.body.filename, url, verified: "Pending" },
        ];
      }

      user.markModified("tasksCompleted");
      await user.save();

      res.status(200).send({ message: "Task URL Added Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  }
);

export default user;
