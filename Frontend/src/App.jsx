import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainLogout from './pages/CaptainLogout'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainHome from './pages/CaptainHome'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div className='lg:w-1/3 md:w-1/2 md:border-2 border-black '>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-signup' element={<UserSignup />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path='/user-logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
        <Route path='/captain-logout' element={
          <UserProtectedWrapper>
            <CaptainLogout />
          </UserProtectedWrapper>
        } />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        }/>
      <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
      }/>
      </Routes>      
    </div>
  )
}

export default App