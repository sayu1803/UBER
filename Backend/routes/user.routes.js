const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const userController = require("../controllers/user.controller")

router.post(
    "/register",
    [
      body("email").isEmail().withMessage("Invalid Email"),
      body("fullName.firstName")
        .isLength({ min: 3 })
        .withMessage("First name must be at least 3 characters long"),
      body("fullName.lastName")
        .optional()
        .isLength({ min: 3 })
        .withMessage("Last name must be at least 3 characters long"),
      body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    ],
    userController.registerUser
  )

module.exports = router

