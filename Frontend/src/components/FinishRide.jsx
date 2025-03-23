import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { useEffect } from "react";

const FinishRide = (props) => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const handleRideEndedUser = () => {
      navigate("/captain-home");
    };

    socket.on("ride-ended-user", handleRideEndedUser);
    return () => {
      socket.off("ride-ended-user", handleRideEndedUser);
    };
  }, [socket, navigate]);

  const endRide = async () => {
    // Make API call to end the ride
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      { rideId: props.rideData._id },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    if (response.status === 200) {
      props.setFinishRidePanel(false);
      navigate("/captain-home");
    }
  };

  return (
    <div className="relative lg:w-1/3 md:w-1/2">
      <h5
        onClick={() => props.setFinishRidePanel(false)}
        className="flex items-center justify-center w-full p-2"
      >
        <i className="text-gray-400 text-2xl ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className="font-semibold text-2xl mb-5">Finish this Ride</h3>
      <div className="flex items-center justify-between p-3 border-2 border-yellow-300 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="/assets/avatar.png"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.rideData?.user?.fullName.firstName}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">{props.rideData?.distance} Km</h5>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className="font-medium text-lg">Pickup location</h3>
              <p className="text-sm text-gray-600">{props.rideData?.pickup}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-xl ri-map-pin-user-fill"></i>
            <div>
              <h3 className="font-medium text-lg">Destination</h3>
              <p className="text-sm text-gray-600">
                {props.rideData?.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3">
            <i className="text-xl ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="font-medium text-lg">
                ₹{props.rideData?.fare?.toLocaleString("en-IN")}
              </h3>
              <p className="text-sm text-gray-600">Cash/Online Payment</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full mb-5">
          <button
            onClick={endRide}
            className="text-lg flex justify-center w-full bg-green-500 text-white p-3 font-semibold rounded-lg mt-5 mb-2"
          >
            Finish Ride
          </button>
          <p className="text-xs mt-5 text-center">
            Click on Finish Ride button if you have received your payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
