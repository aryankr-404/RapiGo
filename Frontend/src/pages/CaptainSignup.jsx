import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlateNumber, setVehiclePlateNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [captainData, setCaptainData] = useState({});

  const navigate = useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plateNumber: vehiclePlateNumber,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      newCaptain
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate(`/captain-home`);
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlateNumber("");
    setVehicleType("");
    setVehicleCapacity("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img className="w-16 mb-7" src="src/assets/" alt="" />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">What's your name?</h3>
          <div className="flex justify-between gap-3">
            <input
              className="bg-[#eeeeee] w-full text-base placeholder:text-base px-4 py-2 mb-3 rounded-md"
              required
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] w-full text-base placeholder:text-base px-4 py-2 mb-3 rounded-md"
              required
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] w-full text-base placeholder:text-base px-4 py-2 mb-3 rounded-md"
            required
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            className="bg-[#eeeeee] w-full text-lg placeholder:text-base px-4 py-2 mb-3 rounded-md"
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex justify-between gap-3">
            <input
              className="bg-[#eeeeee] w-full text-base placeholder:text-base px-4 py-2 mb-3 rounded-md"
              required
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] w-full text-base placeholder:text-base px-4 py-2 mb-3 rounded-md"
              required
              type="text"
              placeholder="Vehicle Plate Number"
              value={vehiclePlateNumber}
              onChange={(e) => setVehiclePlateNumber(e.target.value)}
            />
          </div>

          <div className="flex justify-between gap-3">
            <select
              className="bg-[#eeeeee] w-full text-base placeholder:text-base px-4 py-2 mb-3 rounded-md"
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>
                Vehicle type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
            <input
              className="bg-[#eeeeee] w-full text-base placeholder:text-base px-4 py-2 mb-3 rounded-md"
              required
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
          </div>
          <button className="bg-black text-white px-4 py-2 mb-3 font-semibold w-full rounded-md">
            Create Captain Account
          </button>
        </form>
        <p className=" text-center">
          Already have an account? &nbsp;{" "}
          <Link to="/captain-login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
      <div>
        <p className="text-xs">
          By, proceeding you consent to get calls, Whatsapp or sms messages,
          from RapiGo and its affiliates.{" "}
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
