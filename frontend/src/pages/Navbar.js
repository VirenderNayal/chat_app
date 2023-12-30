import React from 'react'
import logo from '../logo.png'

function Navbar() {
    return (
        <div className='d-flex w-100 text-white cnav align-items-center px-5 section-blur'>
            <div className='p-2'>
                <img style={{filter: "brightness(0) invert(1)"}} src={logo} alt='logo' height={"50px"} />
            </div>
            <div className='h5'>
                goodspace
            </div>
        </div>
    )
}

export default Navbar