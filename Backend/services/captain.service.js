const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({ firstName, lastName, email, password, color, plate, capacity, vehichleType}) => {
    if (!firstName || !email || !password || !color || !plate || !capacity || !vehichleType) {
        throw new Error("Please fill in all required fields")
    }
    const captain = await captainModel.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password,
        vehichle: {
            color,
            plate,
            capacity,
            vehichleType
        }
    })

    return captain
}