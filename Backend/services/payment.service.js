const rideModel = require("../models/ride.model");
const Razorpay = require('razorpay');

module.exports.generateOrder = async(options) => {
    const instance = new Razorpay({ 
        key_id: process.env.RAZORPAY_TEST_MODE_KEY_ID, 
        key_secret: process.env.RAZORPAY_TEST_MODE_KEY_SECRET 
    })
    try {
        const order = await instance.orders.create(options);
        if(!order){
            throw new Error("Order generation failed");
        }
        return order;
    } 
    catch (error) {
        console.error("Error creating order:", error);
    }
}
