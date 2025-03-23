const rideService = require("../services/ride.service");
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { vehicleType, destination, pickup, distance, time, fare } = req.body;
    try {
        const ride = await rideService.createRide({ vehicleType, destination, pickup, distance, time, fare, user: req.user._id });
    
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        // console.log(pickupCoordinates);
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.lng, pickupCoordinates.ltd, 10);
        if(captainsInRadius.length === 0){
            throw new Error("No captains available in the area");
        }
        // console.log(captainsInRadius); 
        ride.otp = "";

        const rideDetailsWithPopulatedUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, { 
                event: 'new-ride', 
                data: rideDetailsWithPopulatedUser,
            });
        })
        res.status(201).json({ ride });
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getFare = async(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {pickup, destination} = req.query;
    try {
        const data = await rideService.getFare(pickup, destination);
        const { fare, distance, time } = data;
        res.status(200).json( {fare, distance, time} );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.confirmRide = async(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId, captainId} = req.body;
    try {
        const ride = await rideService.confirmRide({rideId, captain : req.captain});
        sendMessageToSocketId(ride.user.socketId, { 
            event: 'ride-confirmed', 
            data: ride,
        });

        res.status(200).json({ ride });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.startRide = async(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId, otp} = req.query;
    try {
        const ride = await rideService.startRide({rideId, otp, captain : req.captain});

        sendMessageToSocketId(ride.user.socketId, { 
            event: 'ride-started', 
            data: ride,
        });

        res.status(200).json({ ride });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.endRide = async(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId} = req.body;
    try {
        const ride = await rideService.endRide({rideId, captain : req.captain});
        sendMessageToSocketId(ride.user.socketId, { 
            event: 'ride-ended', 
            data: ride,
        });
        res.status(200).json({ ride });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.endRideUser = async(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId, paymentDetails} = req.body;
    try {
        const ride = await rideService.endRideUser({rideId, user : req.user, paymentDetails});
        sendMessageToSocketId(ride.captain.socketId, { 
            event: 'ride-ended-user', 
            data: ride,
        });
        res.status(200).json({ ride });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}