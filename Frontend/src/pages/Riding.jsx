import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";
import axios from "axios";

const Riding = () => {
  const [paymentDetails, setpaymentDetails] = useState({});

  const location = useLocation();
  const rideData = location.state?.rideData;

  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("ride-ended", () => {
      navigate("/home");
    });
  }, []);

  const endRideUser = async (paymentDetails) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride-user`,
      {
        rideId: rideData._id,
        paymentDetails: paymentDetails,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    if (response.status === 200) {
      navigate("/home");
    }
  };

  const handlePayment = async (e) => {
    const options = {
      amount: rideData.fare * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/razorpay/payment`,
      {
        rideId: rideData._id,
        options: options,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { order } = response.data;
    let payment_id, order_id, signature;
    const paymentOptions = {
      key: import.meta.env.VITE_RAZORPAY_TEST_MODE_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:
        `${rideData.user.fullName.firstName} ${rideData.user.fullName.lastName}` ||
        "Payment request",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: function (response) {
        payment_id = response.razorpay_payment_id;
        order_id = response.razorpay_order_id;
        signature = response.razorpay_signature;
        if (payment_id && order_id && signature) {
          const newPaymentDetails = {
            payment_id,
            order_id,
            signature,
          };
          setpaymentDetails(newPaymentDetails);
          endRideUser(newPaymentDetails);
        }
      },
      prefill: {
        name: rideData?.user?.fullName.firstName,
        email: rideData?.user?.email,
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(paymentOptions);
    rzp1.on("payment.failed", function (response) {
      console.error(response.error);
    });

    rzp1.open();
    e.preventDefault();
  };

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 bg-white h-10 w-10 rounded-full flex items-center justify-center"
      >
        <i className="text-xl font-medium ri-home-4-line"></i>
      </Link>

      <div className="h-1/2">
        <LiveTracking />
      </div>

      <div className="h-1/2 p-4">
        <div className="flex item-center justify-between">
          <img className="h-14" src="src/assets/car.png" alt="" />
          <div className="text-right">
            <h2 className="font-medium text-lg capitalize">
              {rideData?.captain?.fullName.firstName}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {rideData?.captain?.vehicle.plateNumber}
            </h4>
            <p className="text-sm text-gray-600">Swift Desire</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-between items-center">
          <div className="w-full">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className=" text-xl ri-map-pin-user-fill"></i>
              <div>
                <h3 className="font-medium text-lg">Destination</h3>
                <p className="text-sm text-gray-600">{rideData?.destination}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-3">
              <i className="text-xl ri-money-rupee-circle-fill"></i>
              <div>
                <h3 className="font-medium text-lg">
                  ₹{rideData?.fare?.toLocaleString("en-IN")}
                </h3>
                <p className="text-sm text-gray-600">Cash/Online Payment</p>
              </div>
            </div>
          </div>
          <button
            id="rzp-button1"
            onClick={handlePayment}
            className="w-full bg-green-500 text-white p-2 font-semibold rounded-lg mt-5"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
