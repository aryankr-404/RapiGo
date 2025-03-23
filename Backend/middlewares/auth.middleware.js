const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const jwt = require("jsonwebtoken");
const BlacklistTokenModel = require("../models/blacklistToken.model");


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const blacklistToken = await BlacklistTokenModel.findOne({token});
    if (blacklistToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const blacklistToken = await BlacklistTokenModel.findOne({token});
    if (blacklistToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
