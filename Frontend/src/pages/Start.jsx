import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-[url(/assets/traffic_light.jpg)] bg-cover bg-center h-screen pt-2 flex flex-col justify-between w-full">
        <img
          className="w-[8rem] ml-2"
          src="/assets/rapigo_logo.png"
          alt=""
        />
        <div className="bg-white pb-7 px-4 py-4 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold">Get Started with RapiGo</h2>
          <Link
            to="/user-login"
            className="flex justify-center w-full bg-black text-white py-2 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
