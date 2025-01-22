const captainModel = require("../models/captain.model")
const captainService = require("../services/captain.service")
const { validationResult } = require("express-validator")

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

