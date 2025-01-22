const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchmea = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First name must be at least 3 characters long"],
        },
        lastName: {
            type: String,
            minLength: [3, "Last name must be at least 3 characters long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: [5, "Email must be at least 5 char long"],
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },

    status:{
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    vehichle: {  // Corrected to 'vehichle'
        color: {
            type: String,
            required: true,
            minLength: [3, "Color must be at least 3 characters long"],
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, "Plate must be at least 3 characters long"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },
        vehichleType: {  // Corrected to 'vehichleType'
            type: String,
            required: true,
            enum: ["car", "auto", "motorcycle"],
        },
    },
    
    
    location:{
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    },
});

captainSchmea.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn: "24h"})
    return token;
}

captainSchmea.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchmea.statics.hashPassword = async (password) => await bcrypt.hash(password, 10);

const captainModel = mongoose.model("captain", captainSchmea);


module.exports = captainModel;