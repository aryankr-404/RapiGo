const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

//Register route
router.post("/register",[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
    body('fullName.firstName').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
],
 userController.registerUser
);

//Login route
router.post("/login",[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
],
userController.loginUser
);

// Profile route
router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

// Logout route
router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
