const captainModel = require("../models/captain.model")
const captainService = require("../services/captain.service")
const { validationResult } = require("express-validator")
const blacklistTokenModel = require("../models/blacklistToken.model");


module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { fullName, email, password, vehichle } = req.body

        const isCaptainAlreadyExist = await captainModel.findOne({ email })

        if (isCaptainAlreadyExist) {
            return res.status(400).json({ message: "Captain already exists" })
        }

        const hashPassword = await captainModel.hashPassword(password)

        const captain = await captainService.createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashPassword,
            color: vehichle.color,  // Corrected to 'vehichle'
            plate: vehichle.plate,  // Corrected to 'vehichle'
            capacity: vehichle.capacity,  // Corrected to 'vehichle'
            vehichleType: vehichle.vehichleType // Corrected field
        });

        const token = captain.generateAuthToken()

        res.status(201).json({ token, captain })
    } catch (error) {
        next(error)
    }
}


module.exports.loginCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        // Find the captain and include the password field
        const captain = await captainModel.findOne({ email }).select("+password");

        if (!captain) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        // Use the comparePassword method on the captain instance
        const isMatch = await captain.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        const token = captain.generateAuthToken();
        res.cookie("token", token);

        res.status(200).json({ token, captain });
    } catch (error) {
        next(error);
    }
};



module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        const captain = req.captain
        res.status(200).json(captain)
    } catch (error) {
        next(error)
    }
}

module.exports.logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Add the token to the blacklist
        await blacklistTokenModel.create({ token });

        res.clearCookie("token"); // Clear the token cookie
        res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        next(error);
    }
};

