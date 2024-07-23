import { Router } from "express";
import nodemailer from "nodemailer";
import { body, validationResult } from "express-validator";

const mail = Router();

function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILING_USER,
    pass: process.env.MAILING_USER,
  },
});

export const optStorage = {};

mail.post(
  "/getOtp",
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

    const otp = generateOTP();
    const expirationTime = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
    optStorage[req.body.email] = { otp, expirationTime };
    setTimeout(() => {
      delete optStorage[req.body.email];
      console.log(`OTP for ${email} has been deleted due to expiration.`);
    }, 5 * 60 * 1000);

    const mailOptions = {
      from: process.env.MAILING_USER,
      to: req.body.email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  }
);
