const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const BlacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, fullName, vehicle} = req.body;
    const isCaptainAlreadyRegistered = await captainModel.findOne({email});
    if(isCaptainAlreadyRegistered){
        return res.status(400).json({message: "Captain already registered"});
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstName : fullName.firstName,
        lastName : fullName.lastName,
        email,
        password : hashedPassword,
        color : vehicle.color,
        plateNumber : vehicle.plateNumber,
        capacity : vehicle.capacity,
        vehicleType : vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();
    res.status(201).json({token, captain});
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(400).json({message: "Captain not found"});
    }
    const isPasswordCorrect = await captain.comparePassword(password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid email or password"});
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({token, captain});
}   

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({captain: req.captain});
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({message: "Logged out successfully"});
}



