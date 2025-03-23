import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [iserror, setError] = useState(false);

  const navigate = useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captainData = {
      email : email,
      password : password
    };
    setEmail('');
    setPassword('');
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);
      if(response.status === 200){  
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
        // setError(false);
    }else{
      setError(true);
    }
      
    } catch (error) {
      setError(true);
    }
    
  }
  
  
  return (
    <div className= "p-7 flex flex-col justify-between h-screen">
      <div>
      <img className='w-16 mb-7' src="/assets/logo.png" alt="" />
      <form onSubmit={handleSubmit}>
        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input
         className='bg-[#eeeeee] w-full text-base placeholder:text-base px-4 py-2 mb-5 rounded-md'
         required type="email" placeholder='email@example.com'
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        />
        <div className='relative'>
          <h3 className='text-lg font-medium mb-2'>Enter password</h3>
          <input
          className='bg-[#eeeeee] w-full text-lg placeholder:text-base px-4 py-2 mb-5 rounded-md'
          required 
          placeholder='Password'
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`absolute right-5 top-11 text-2xl cursor-pointer ${showPassword ? 'ri-eye-fill' : 'ri-eye-off-fill'}`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>  
        {iserror && <p className='text-red-500 text-sm mb-3'>Invalid email or password</p>}

        <button className='bg-black text-white px-4 py-2 mb-3 font-semibold w-full rounded-md'>Login</button>
      </form>
      <p className=' text-center'>New to RapiGO? &nbsp; <Link to='/captain-signup' className='text-blue-500'>Register as a captain</Link></p> 
      </div>
      <div>
        <Link to='/user-login' className='bg-orange-500 flex justify-center items-center text-white px-4 py-2 mb-5 font-semibold w-full rounded-md'>SignIn as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
