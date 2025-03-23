import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopup = (props) => {
  const navigate = useNavigate();
  const [otp, setotp] = useState("");
  const [wrongOtp, setWrongOtp] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: props.ride._id,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
        setWrongOtp(false);
        navigate("/captain-riding", { state: { ride: props.ride } }); //sending ride data while navigating
      } else {
        setWrongOtp(true);
      }
    } catch (error) {
      setWrongOtp(true);
      console.error("Error confirming ride:", error);
    }
  };

  return (
    <div className="lg:w-1/3 md:w-1/2">
      <h5
        onClick={() => props.setConfirmRidePopupPanel(false)}
        className="flex items-center justify-center w-full mb-2 relative "
      >
        <i className="text-gray-400 text-2xl ri-close-large-line"></i>
      </h5>

      <h3 className="font-semibold text-2xl mb-5">
        Confirm this ride to start
      </h3>
      <div className="flex items-center justify-between p-3 bg-yellow-300 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="/assets/avatar.png"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.ride.user?.fullName.firstName +
              " " +
              props.ride.user?.fullName.lastName}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">{props.ride?.distance} Km</h5>
      </div>

      <div className="flex flex-col justify-between items-center">
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

        <div className="mt-6 w-full ">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            {wrongOtp && (
              <p className="text-red-500 text-sm mb-3">Invalid OTP</p>
            )}
            <input
              value={otp}
              onChange={(e) => setotp(e.target.value)}
              type="text"
              placeholder="Enter OTP"
              className="bg-[#eeeeee] font-mono text-lg px-6 py-4 rounded-lg w-full"
            />
            <button
              type="submit"
              className="text-lg flex justify-center w-full bg-green-500 text-white p-3 font-semibold rounded-lg mt-4 mb-2"
            >
              Confirm
            </button>
            <button
              type="submit"
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className=" text-lg w-full bg-red-500 text-white p-3 font-semibold rounded-lg mt-1"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
