import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [FinishRidePanel, setFinishRidePanel] = useState(false);
  const FinishRidePanelRef = useRef(null);
  const location = useLocation();

  const rideData = location.state?.ride;
  const time = rideData.duration;
  const hours = Math.floor(time / 60);
  const minutes = (time % 60).toFixed(1);
  const formattedTime = `${hours}h ${minutes}m`;

  useGSAP(() => {
    if (FinishRidePanel) {
      gsap.to(FinishRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(FinishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [FinishRidePanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-2 t-0 flex items-center justify-between w-full">
        <img className="w-16" src="/assets/_rapigo_logo.png" alt="" />
        <Link
          to="/captain-home"
          className="bg-white h-10 w-10 rounded-full flex items-center justify-center"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-4/5">
        <LiveTracking />
      </div>

      <div
        onClick={() => setFinishRidePanel(true)}
        className="h-1/5 bg-yellow-400 relative flex justify-center "
      >
        <h5 className="absolute p-1 text-center w-screen top-0">
          <i className="text-gray-800 text-3xl ri-arrow-up-wide-line"></i>
        </h5>
        <div className="w-full flex justify-between items-center p-8 ">
          <h4 className="text-2xl font-semibold">{formattedTime}</h4>
          <button className=" flex justify-center  bg-green-500 text-white p-3 px-8 font-semibold rounded-lg ">
            Complete Ride
          </button>
        </div>
      </div>

      <div
        ref={FinishRidePanelRef}
        className="z-10 fixed translate-y-full bottom-0 bg-white px-3 py-2 w-full"
      >
        <FinishRide
          setFinishRidePanel={setFinishRidePanel}
          rideData={rideData}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
