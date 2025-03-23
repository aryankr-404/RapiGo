const mapServices = require('../services/maps.service')
const { validationResult } = require('express-validator');


module.exports.getCoordinates = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    try {
        const coordinates = await mapServices.getAddressCoordinate(address) 
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: "Coordinates not found"}) ;
    }
}

module.exports.getDistanceTime = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    try {
        const distanceTime = await mapServices.getDistanceTime(origin, destination) 
        res.status(200).json(distanceTime);
    } catch (error) {
        res.status(404).json({ message: "Distance and time not found"}) ;
    }
}

module.exports.getAutoCompleteSuggestion = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;
    try {
        const autoCompleteSuggestion = await mapServices.getAutoCompleteSuggestion(input) 
        res.status(200).json(autoCompleteSuggestion);
    } catch (error) {
        res.status(404).json({ message: "Auto complete suggestion not found"}) ;
    }
}