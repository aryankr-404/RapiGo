const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min : 3}).withMessage('Invalid pickup location'),
    body('destination').isString().isLength({min : 3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type'),
    rideController.createRide,
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min : 3}).withMessage('Invalid pickup location'),
    query('destination').isString().isLength({min : 3}).withMessage('Invalid destination address'),
    rideController.getFare,
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    rideController.confirmRide,
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride ID'),
    rideController.startRide,
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    rideController.endRide,
)

router.post('/end-ride-user',
    authMiddleware.authUser,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    rideController.endRideUser,
)

module.exports = router;