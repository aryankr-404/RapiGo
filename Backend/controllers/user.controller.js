const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const BlacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, fullName } = req.body;
    const isUserAlreadyRegistered = await userModel.findOne({email});
    if(isUserAlreadyRegistered){
        return res.status(400).json({message: "User already registered"});
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        email,
        password : hashedPassword,
        firstName : fullName.firstName,
        lastName : fullName.lastName
    });

    const token = user.generateAuthToken();
    res.status(201).json({token, user});
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    
    res.status(200).json({token, user});
}

module.exports.getUserProfile = async (req, res, next) => {
   res.status(200).json({user: req.user});
}

module.exports.logoutUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({message: "Logged out successfully"});
}





