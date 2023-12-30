import React, { useState } from 'react'
import Navbar from './Navbar'
import logo from "../logo.png"

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
              {
                isLogin ?
                  <>
                    <button className='btn btn-primary w-25 mx-2' onClick={switchLoginSignup}>Log In</button>
                    <button className='btn btn-dark w-25 mx-2' onClick={switchLoginSignup}>Sign Up</button>
                  </>
                  :
                  <>
                    <button className='btn btn-dark w-25 mx-2' onClick={switchLoginSignup}>Log In</button>
                    <button className='btn btn-primary w-25 mx-2' onClick={switchLoginSignup}>Sign Up</button>
                  </>
              }

            </div>

            {
              isLogin ?
                <>
                  <from className="w-100 d-flex flex-column justify-content-center align-items-center">
                    <div className="form-group w-75 py-2">
                      <label for="email">Your Email id</label>
                      <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group w-75 py-2">
                      <label for="password">Password</label>
                      <input type="password" className="form-control" id="password" />
                    </div>
                  </from>
                </>
                :
                <>
                  <from className="w-100 d-flex flex-column justify-content-center align-items-center">
                    <div className="form-group w-75 py-2">
                      <label for="email">Your Email id</label>
                      <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group w-75 py-2">
                      <label for="password">Password</label>
                      <input type="password" className="form-control" id="password" />
                    </div>
                    <div className="form-group w-75 py-2">
                      <label for="password">Re-Enter Password</label>
                      <input type="password" className="form-control" id="password" />
                    </div>
                  </from>
                </>

            }

            {
              isLogin ?
                <>
                  <button className='btn btn-primary w-50'>Lets Go!!</button>
                </>
                :
                <>
                  <button className='btn btn-primary w-50'>SignUp</button>
                </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage