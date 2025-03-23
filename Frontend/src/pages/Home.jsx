import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel.jsx";
import VehiclePanel from "../components/VehiclePanel.jsx";
import ConfirmRide from "../components/ConfirmRide.jsx";
import WaitingForDriver from "../components/WaitingForDriver.jsx";
import LookingForDriver from "../components/LookingForDriver.jsx";
import { SocketContext } from "../context/SocketContext.jsx";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking.jsx";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null); // 'pickup' or 'destination'
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState("");
  const [ride, setRide] = useState({});
  const [mapHidden, setMapHidden] = useState(false);
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const confirmRidePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setVehiclePanel(false);
    setRide(ride);
  });

  socket.on("ride-started", (data) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { rideData: ride } });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = async (value, field) => {
    if (field === "pickup") {
      setpickup(value);
    } else {
      setDestination(value);
    }
    setActiveField(field);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    if (activeField === "pickup") {
      setpickup(suggestion.description);
    } else {
      setDestination(suggestion.description);
    }
    setSuggestions([]);
  };

  const handleFindRide = async () => {
    setMapHidden(false);
    if (pickup && destination) {
      setVehiclePanel(true);
      setPanelOpen(false);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(response.data.fare);
      setDistance(response.data.distance);
      setTime(response.data.time);
    }
  };

  const createRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        vehicleType,
        destination,
        pickup,
        distance,
        time,
        fare,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  const handleMapInFullScreen = () => {
    setPanelOpen(true);
    setMapHidden(true);
  };

  const handleMapUsingArrow = () => {
    setPanelOpen(false);
    setMapHidden(false);
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "100%",
        padding: 24,
      });
      gsap.to(panelCloseRef.current, {
        opacity: "1",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0",
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="/assets/rapigo_logo.png"
        alt=""
      />

      <div className="w-full relative top-0 h-full flex flex-col justify-end ">
        <div className={`h-screen z-10 ${mapHidden ? "hidden" : ""}`}>
          <LiveTracking />
        </div>

        <div className="h-[38%] bg-white p-6 relative bottom-0 z-10">
          <h4
            ref={panelCloseRef}
            onClick={handleMapUsingArrow}
            className="absolute top-3 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h4>

          <h4 className="text-2xl font-semibold">Find a ride</h4>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="line h-16 w-1 bg-gray-700 absolute top-[39%] left-10 rounded-full"></div>
            <input
              onClick={handleMapInFullScreen}
              onChange={(e) => handleInputChange(e.target.value, "pickup")}
              className="bg-[#eeeeee] text-lg px-12 py-2 rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pickup location"
              value={pickup}
              name="pickup"
            />

            <input
              className="bg-[#eeeeee] text-lg px-12 py-2 rounded-lg w-full mt-4"
              onClick={handleMapInFullScreen}
              onChange={(e) => handleInputChange(e.target.value, "destination")}
              type="text"
              placeholder="Add your destination"
              value={destination}
              name="destination"
            />

            <button
              onClick={() => handleFindRide()}
              className="bg-black text-white text-lg px-12 py-2 rounded-lg w-full mt-4"
            >
              Find a ride
            </button>
          </form>
        </div>

        <div
          ref={panelRef}
          className="bg-white h-[70%] relative bottom-0 overflow-y-auto"
        >
          <LocationSearchPanel
            suggestions={suggestions}
            onSuggestionSelect={handleSuggestionSelect}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="z-10 fixed bottom-0 bg-white px-3 py-6 w-full  translate-y-full"
      >
        <VehiclePanel
          setVehicleType={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="z-10 fixed bottom-0 bg-white px-3 py-6 w-full translate-y-full"
      >
        <ConfirmRide
          createRide={createRide}
          vehicleType={vehicleType}
          pickup={pickup}
          fare={fare}
          destination={destination}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="z-10 fixed bottom-0 bg-white px-3 py-6 w-full translate-y-full"
      >
        <LookingForDriver
          vehicleType={vehicleType}
          pickup={pickup}
          fare={fare}
          destination={destination}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="z-10 fixed bottom-0 bg-white px-3 py-6 w-full translate-y-full"
      >
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriver}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default Home;
