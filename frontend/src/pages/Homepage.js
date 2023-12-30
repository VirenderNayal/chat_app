import React, { useState } from 'react'
import Navbar from './Navbar'
import logo from "../logo.png"
import Login from '../components/Login'
import Signup from '../components/Signup'

const Homepage = () => {
  const [isLogin, setIsLogin] = useState(true)

  const switchLoginSignup = () => {
    setIsLogin(!isLogin)
  }
  return (
    <div className='d-flex flex-column vh-100'>
      <Navbar />

      <div className='d-flex text-white h-100'>
        <div className='d-flex flex-column justify-content-center w-100 px-5'>
          <div>
            <img src={logo} alt="logo" height={"170px"} style={{ filter: "brightness(0) invert(1)" }} />
          </div>
          <div className='mx-4 h2 py-2'>
            Welcome to <br /> Goodspace Communications
          </div>
        </div>

        <div className='d-flex align-items-center justify-content-center w-100'>
          <div className='d-flex flex-column align-items-center justify-content-evenly section-blur h-75 w-75 rounded py-5'>
            <div className='w-100 d-flex align-items-center justify-content-center text-white'>
              <button className= {`btn btn-${isLogin ? "primary" : "dark"} w-25 mx-2`} onClick={switchLoginSignup}>Log In</button>
              <button className= {`btn btn-${isLogin ? "dark" : "primary"} w-25 mx-2`} onClick={switchLoginSignup}>Sign Up</button>
            </div>

            {
              isLogin ? <Login /> : <Signup/>   
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage