import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (
        <>
            <from className="w-100 d-flex flex-column justify-content-center align-items-center">
                <div className="form-group w-75 py-2">
                    <label for="email">Your Email id</label>
                    <input type="email" className="form-control" id="email" onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className="form-group w-75 py-2">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
            </from>

            <button className='btn btn-primary w-50'>Lets Go!!</button>
        </>
    )
}

export default Login