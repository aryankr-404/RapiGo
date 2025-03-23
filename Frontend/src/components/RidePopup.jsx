import React from 'react'

const RidePopup = (props) => {
  return (
    <div className='lg:w-1/3 md:w-1/2'>
        <h5 onClick={() => props.setRidePopupPanel(false)} className='flex items-center justify-center w-full '><i className="text-gray-400 text-2xl ri-arrow-down-wide-fill"></i></h5>

        <h3 className='font-semibold text-2xl mb-5'>New ride Available!</h3>
        <div className='flex items-center justify-between p-3 bg-yellow-300 rounded-lg'>
            <div className='flex items-center gap-3 '>
                <img className='h-12 w-12 rounded-full object-cover' src="/assets/avatar.png" alt="" />
                <h2 className='text-lg font-medium'>{props.ride.user?.fullName.firstName + " " + props.ride.user?.fullName.lastName}</h2>
            </div>
            <h5 className='text-lg font-semibold'>{props.ride?.distance} Km</h5>
        </div>

        <div className='flex flex-col gap-2 justify-between items-center'>
        <div className='w-full'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className=" text-xl ri-map-pin-2-fill"></i>
                <div>
                <h3 className='font-medium text-lg'>Pickup Location</h3>
                <p className='text-sm text-gray-600'>{props.ride?.pickup}</p>
                </div>  
            </div>

            <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className=" text-xl ri-map-pin-user-fill"></i>
                <div>
                <h3 className='font-medium text-lg'>Destination</h3>
                <p className='text-sm text-gray-600'>{props.ride?.destination}</p>
                </div>  
            </div>
            
            <div className='flex items-center gap-5 p-3'>
                <i className="text-xl ri-money-rupee-circle-fill"></i>
                <div>
                <h3 className='font-medium text-lg'>₹{props.ride?.fare?.toLocaleString('en-IN')}</h3>
                <p className='text-sm text-gray-600'>Cash/Online Payment</p>
                </div>  
            </div>

        </div>
        <button
        onClick={() =>{
            props.setRidePopupPanel(false);
            props.setConfirmRidePopupPanel(true);
            props.confirmRide();
        }} 
        className='w-full bg-green-500 text-white p-3 font-semibold rounded-lg mt-5'>Accept</button>

        <button
        onClick={() =>{
            props.setRidePopupPanel(false);
        }} 
        className='w-full bg-gray-300 text-gray-700 p-3 font-semibold rounded-lg mt-1'>Ignore</button>
        
        </div>
    </div>
  )
}

export default RidePopup