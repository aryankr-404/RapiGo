const userModel = require("../models/user.model");

module.exports.createUser = async ({
    firstName,
    lastName,
    email,
    password,
}) => {
    const user = await userModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
    });
    return user;
}
