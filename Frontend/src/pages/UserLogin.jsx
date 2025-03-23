import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { UserDataContext } from '../context/UserContext.jsx';

const UserLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserDataContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData ={
      email : email,
      password : password
    }
    setEmail('');
    setPassword('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate(`/home`);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className= "p-7 flex flex-col justify-between h-screen relative">
      <div>
      <img className='w-16 mb-7' src="/assets/logo.png" alt="" />
      <form onSubmit={handleSubmit} className='relative'>
        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input
         className='bg-[#eeeeee] w-full text-lg placeholder:text-base px-4 py-2 mb-5 rounded-md'
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
            className={`absolute right-5 top-11 text-2xl cursor-pointer ${showPassword ? 'ri-eye-fill' : 'ri-eye-off-fill'}`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        {error && <p className='text-red-500 text-sm mb-3'>Invalid email or password</p>}

        <button className='bg-black text-white px-4 py-2 mb-3 font-semibold w-full rounded-md'>Login</button>
      </form>
      <p className='text-center'>New to RapiGo? &nbsp; <Link to='/user-signup' className='text-blue-500'>Create new account</Link></p> 

      </div>

      <div>
        <Link to='/captain-login' className='bg-green-500 flex justify-center items-center text-white px-4 py-2 mb-5 font-semibold w-full rounded-md'>SignIn as Captain</Link>
      </div>
    </div>


  )
}

export default UserLogin