import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState({});

  const ConfirmRidePopupPanelRef = useRef(null);
  const ridePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", { userId: captain._id, userType: "captain" });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 5000);
    updateLocation();

    // return () => clearInterval(locationInterval); // Cleanup function to clear the interval
  }, []);

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopupPanel(true);
  });

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-2 t-0 flex items-center justify-between w-full">
        <img className="w-16" src="/assets/rapigo_logo.png" alt="" />
        <Link
          to="/captain-logout"
          className="bg-white h-10 w-10 rounded-full flex items-center justify-center"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <LiveTracking />
      </div>

      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopupPanelRef}
        className="z-10 fixed translate-y-full bottom-0 bg-white px-3 py-6 w-full "
      >
        <RidePopup
          ride={ride}
          confirmRide={confirmRide}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>

      <div
        ref={ConfirmRidePopupPanelRef}
        className="h-screen z-10 fixed translate-y-full bottom-0 bg-white px-3 py-4 w-full "
      >
        <ConfirmRidePopup
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
