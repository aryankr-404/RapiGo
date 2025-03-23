import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import {UserDataContext} from '../context/UserContext.jsx';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const [userData, setUserData] = useState({});
  
  const navigate = useNavigate(); 
  const { user, setUser } = React.useContext(UserDataContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName :{
        firstName : firstName,
        lastName : lastName
      },
      email : email,
      password : password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if(response.status === 201){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate(`/home`);
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }

  return (
    <div className= "p-7 flex flex-col justify-between h-screen relative">
      <div>
      <img className='w-16 mb-7' src="/assets/logo.png" alt="" />
      <form onSubmit={handleSubmit} relative>
        <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
          <div className='flex justify-between gap-3'>
            <input
            className='bg-[#eeeeee] w-full text-base placeholder:text-base px-4 py-2 mb-5 rounded-md'
            required type="text" placeholder='First name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
            <input
            className='bg-[#eeeeee] w-full text-base placeholder:text-base px-4 py-2 mb-5 rounded-md'
            required type="text" placeholder='Last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
          type={showPassword ? "text" : "password"}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`absolute right-[1.5vw] top-11 text-2xl cursor-pointer ${showPassword ? 'ri-eye-fill' : 'ri-eye-off-fill'}`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <button className='bg-black text-white px-4 py-2 mb-3 font-semibold w-full rounded-md'>Create Account</button>
      </form>
      <p className=' text-center'>Already have an account? &nbsp; <Link to='/user-login' className='text-blue-500'>Login</Link></p> 
      </div>
      <div>
        <p className='text-xs '>By, proceeding you consent to get calls, Whatsapp or sms messages, from RapiGo and its affiliates. </p>
      </div>
    </div>
  )
}

export default UserSignup