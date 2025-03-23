import React from "react";

const WaitingForDriver = (props) => {
  let imageUrl;
  const vehicleType = props.ride?.captain?.vehicle.vehicleType;

  if (vehicleType === "car") {
    imageUrl = "/assets/car.png";
  } else if (vehicleType === "bike") {
    imageUrl = "/assets/bike.png";
  } else if (vehicleType === "auto") {
    imageUrl = "/assets/auto.png";
  } else {
    imageUrl = "/assets/default_vehicle.png";
  }

  return (
    <div className="lg:w-1/3 md:w-1/2">
      <h5
        onClick={() => props.setWaitingForDriver(false)}
        className="flex items-center justify-center w-full "
      >
        <i className="text-gray-400 text-2xl ri-arrow-down-wide-fill"></i>
      </h5>

      <div className="flex item-center justify-between px-5">
        <img className="h-16" src={imageUrl} alt="" />
        <div className="text-right">
          <h2 className="font-medium text-lg">
            {props.ride?.captain?.fullName.firstName}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1 capitalize">
            {props.ride?.captain?.vehicle.plateNumber}
          </h4>
          <p className="text-sm text-gray-600">Vehicle</p>
          <h2 className="font-medium text-lg">OTP - {props.ride?.otp}</h2>
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className="font-medium text-lg">Pickup Location</h3>
              <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-xl ri-map-pin-user-fill"></i>
            <div>
              <h3 className="font-medium text-lg">Destination</h3>
              <p className="text-sm text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3">
            <i className="text-xl ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="font-medium text-lg">
                ₹{props.ride?.fare?.toLocaleString("en-IN")}
              </h3>
              <p className="text-sm text-gray-600">Cash/Online Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
