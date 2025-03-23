import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div className='lg:w-1/3 md:w-1/2'>
        <h5 onClick={() => props.setVehiclePanel(false)} className='flex items-center justify-center w-full '><i className="text-gray-400 text-2xl ri-arrow-down-wide-fill"></i></h5>

        <h3 className='font-semibold text-2xl mb-5'>Choose a vehicle</h3>

         <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.setVehicleType('car');
        }} 
          className='flex items-center justify-between w-full p-3 border-2 active:border-black rounded-xl mb-2'>
          <img className='h-12' src="/assets/car.png" alt="" />
          <div className='w-1/2'>
            <h4 className='font-medium text-base'>Car <span><i className="ri-user-fill"></i>4</span> </h4>
            <h5 className='font-medium text-sm'>2 min away</h5>
            <p className='font-normal text-xs'>Affordable, compact rides</p >
          </div>
          <h2 className='font-semibold text-lg'>₹{props.fare.car?.toLocaleString('en-IN')}</h2>
         </div>

         <div onClick={()=>{
          props.setConfirmRidePanel(true) 
          props.setVehicleType('bike')
          }} 
          className='flex items-center justify-between w-full p-3 border-2 active:border-black rounded-xl mb-2'>
          <img className='h-12' src="/assets/bike.png" alt="" />
          <div className='w-1/2'>
            <h4 className='font-medium text-base'>Moto <span><i className="ri-user-fill"></i>1</span> </h4>
            <h5 className='font-medium text-sm'>3 min away</h5>
            <p className='font-normal text-xs'>Affordable motorcycle rides</p >
          </div>
          <h2 className='font-semibold text-lg'>₹{props.fare.bike?.toLocaleString('en-IN')}</h2>
         </div>

         <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.setVehicleType('auto')
          }} 
          className='flex items-center justify-between w-full p-3 border-2 active:border-black rounded-xl mb-2'>
          <img className='h-12' src="/assets/auto.png" alt="" />
          <div className='w-1/2'>
            <h4 className='font-medium text-base'>Auto <span><i className="ri-user-fill"></i>4</span> </h4>
            <h5 className='font-medium text-sm'>2 min away</h5>
            <p className='font-normal text-xs'>Affordable, compact rides</p >
          </div>
          <h2 className='font-semibold text-lg'>₹{props.fare.auto?.toLocaleString('en-IN')}</h2>
         </div>
    </div>
  )
}

export default VehiclePanel