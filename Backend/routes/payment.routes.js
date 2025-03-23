const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const paymentController = require('../controllers/payment.controller');

router.post('/payment', authMiddleware.authUser, paymentController.generateOrder);

module.exports = router;