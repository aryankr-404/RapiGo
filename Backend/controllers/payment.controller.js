const { validationResult } = require('express-validator');
const {sendMessageToSocketId} = require('../socket');
const paymentService = require('../services/payment.service');

module.exports.generateOrder = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId, options} = req.body;
   try{
        const order = await paymentService.generateOrder(options);
        if(order.length === 0){
            throw new Error("Order generation failed");
        }
        res.status(200).json({ order });
   }catch(error){
         res.status(400).json({ message: error.message });
   }
}