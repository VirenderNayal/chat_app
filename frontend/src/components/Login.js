import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [ack, setAck] = useState()
    const navigate = useNavigate();

    const submitHandler = async () => {
        setAck("");
        if (!email || !password) {
            setAck("Email and Password are required.");
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }

            const { data } = await axios.post("/api/user/login", { email, password }, config);

            setAck("Log In successfull !!");

            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate("/chat")
        } catch (error) {
            console.log(error);
            setAck(error)
        }

    }

    return (
        <>
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <div className="form-group w-75 py-2">
                    <label for="email">Your Email id</label>
                    <input type="email" className="form-control" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="form-group w-75 py-2">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
            </div>

            <button className='btn btn-primary w-50' onClick={submitHandler}>Lets Go!!</button>
        </>
    )
}

export default Login