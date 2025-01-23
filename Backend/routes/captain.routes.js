const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', [
    body("fullName.firstName")
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 3 })
        .withMessage("First name must be at least 3 characters long"),
    body("fullName.lastName")
        .optional()
        .isLength({ min: 3 })
        .withMessage("Last name must be at least 3 characters long"),
    body("email")
        .isEmail()
        .withMessage("Invalid Email"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
        body("vehichle.color")
        .notEmpty()
        .withMessage("Vehicle color is required"),
    body("vehichle.plate")
        .notEmpty()
        .withMessage("Vehicle plate is required"),
    body("vehichle.capacity")
        .isInt({ min: 1 })
        .withMessage("Capacity must be at least 1"),
    body("vehichle.vehichleType")
        .isIn(["car", "auto", "motorcycle"])
        .withMessage("Invalid vehicle type"),
], captainController.registerCaptain
)


router.post('/login', [
    body("email")
        .isEmail()
        .withMessage("Invalid Email"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
], captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain,captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain,captainController.logoutCaptain)



module.exports = router;