import React from "react";

const ConfirmRide = (props) => {
  let imageUrl;
  if (props.vehicleType === "car") {
    imageUrl = "/assets/car.png";
  } else if (props.vehicleType === "bike") {
    imageUrl = "/assets/bike.png";
  } else if (props.vehicleType === "auto") {
    imageUrl = "/assets/auto.png";
  } else {
    imageUrl = "/assets/car.png";
  }

  return (
    <div className="lg:w-1/3 md:w-1/2">
      <h5
        onClick={() => props.setConfirmRidePanel(false)}
        className="flex items-center justify-center w-full "
      >
        <i className="text-gray-400 text-2xl ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className="font-semibold text-2xl mb-5">Confirm Your Ride</h3>

      <div className="flex flex-col gap-2 justify-between items-center">
        <img className="h-24" src={imageUrl} alt="" />

        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className="font-medium text-lg">Pickup Location</h3>
              <p className="text-sm text-gray-600">{props.pickup}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-xl ri-map-pin-user-fill"></i>
            <div>
              <h3 className="font-medium text-lg">Destination</h3>
              <p className="text-sm text-gray-600">{props.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3">
            <i className="text-xl ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="font-medium text-lg">
                ₹{props.fare[props.vehicleType]?.toLocaleString("en-IN")}
              </h3>
              <p className="text-sm text-gray-600">Cash/Online Payment</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.createRide(props.vehicleType);
          }}
          className="w-full bg-green-500 text-white p-2 font-semibold rounded-lg mt-5 mb-0"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
