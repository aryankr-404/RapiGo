const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require("crypto");

function getOtp(num){
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num));
        return otp.toString().padStart(num, '0');
    }
    return generateOtp(num);
}

module.exports.getFare = async(pickup, destination) => {
    if (!pickup || !destination) {
      throw new Error("Pickup and destination are required");
    }
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    
    const distanceInKm = distanceTime.distance.value / 1000; // meters to km
    const timeInMinutes = distanceTime.duration.value / 60; // seconds to minutes
  
    const fareRates = {
      car: { baseFare: 50, perKm: 15, perMinute: 3 },
      bike: { baseFare: 30, perKm: 8, perMinute: 1.5 },
      auto: { baseFare: 40, perKm: 10, perMinute: 2 },
    };
  
    const calculateFare = (rate) => {
      return (
        rate.baseFare + rate.perKm * distanceInKm + rate.perMinute * timeInMinutes
      );
    };
  
    return {   
      fare: {
        car: Math.round(calculateFare(fareRates.car)),
        bike: Math.round(calculateFare(fareRates.bike)),
        auto: Math.round(calculateFare(fareRates.auto)),
      },
      distance: distanceInKm,
      time: timeInMinutes,
    };
}

module.exports.createRide = async ({ vehicleType, destination, pickup, user, fare, distance, time }) => {
    if (!vehicleType || !destination || !pickup || !user || !fare || !distance || !time) {
      throw new Error("All fields are required");
    }
    // const fare = await this.getFare(pickup, destination);

    const ride = await rideModel.create({
      fare: fare[vehicleType],
      destination,
      pickup,
      user,
      otp: getOtp(6),
      distance,
      duration: time,
    });
    return ride;
};

module.exports.confirmRide = async ({rideId, captain}) => {
  const tempRide = await rideModel.findOneAndUpdate({_id : rideId}, {
    status : "accepted",
    captain : captain._id,
  },
  { new: true }
);

  const ride = await rideModel.findOne({_id : rideId}).populate('user').populate('captain').select('+otp');
  if (!ride) {
    throw new Error("Ride not found");
  }
  return ride;
}

module.exports.startRide = async ({rideId, otp, captain}) => {
  if(!rideId || !otp) {
    throw new Error("Ride ID and OTP are required");
  }
  const ride = await rideModel.findOne({ _id: rideId}).populate('user').populate('captain').select('+otp');
  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }
  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findByIdAndUpdate(rideId, { status: "started" });

  return ride;
}

module.exports.endRide = async ({rideId, captain}) => {
  const ride = await rideModel.findOne({ _id: rideId}).populate('user').populate('captain');
  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.captain._id.toString() !== captain._id.toString()) {
    throw new Error("You are not the captain of this ride");
  }
  await rideModel.findByIdAndUpdate(rideId, { status: "completed" });

  return ride;
}

module.exports.endRideUser = async ({rideId, paymentDetails}) => {
  
  await rideModel.findByIdAndUpdate(rideId, 
    { status: "completed",
      paymentId: paymentDetails.payment_id,
      orderId: paymentDetails.order_id,
      signature: paymentDetails.signature
    },
    { new: true }
  );
  const ride = await rideModel.findOne({ _id: rideId}).populate('user').populate('captain');

  if (!ride) {
    throw new Error("Ride not found");
  }
  return ride;
}
