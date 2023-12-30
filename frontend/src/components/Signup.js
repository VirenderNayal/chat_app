import React, { useState } from 'react';
const axios = require("axios");
const { useNavigate } = "react-router-dom";

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [repassword, setRepassword] = useState()
    const [ack, setAck] = useState()
    const navigate = useNavigate;

    const submitHandler = async () => {
        setAck("");
        if (!email || !password || !repassword || !name) {
            setAck("Please fill all the fields.");
            return;
        }

        if (password !== repassword) {
            setAck("Password doesn't match");
            return;
        }

        // try {
        //     const config = {
        //         headers: {
        //             "Content-type": "application/json",
        //         },
        //     }

        //     // const { data } = await axios.post("/api/user", { name, email, password }, config);

        //     // setAck("Sign Up successfull !!");

        //     // localStorage.setItem('userInfo', JSON.stringify(data));
        //     // console.log("before calll");
        //     // const data = await axios.get("/ss");
        //     // console.log(data);
        //     // navigate("/login")

        // } catch (error) {
        //     console.log("nocall")
        //     // setAck(error)
        // }
    }
    return (
        <>
            <from className="w-100 d-flex flex-column justify-content-center align-items-center mt-2">
                <div className="form-group w-75 py-2">
                    <label for="name">Your Name</label>
                    <input type="text" className="form-control" id="name" onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="form-group w-75 py-2">
                    <label for="email">Your Email id</label>
                    <input type="email" className="form-control" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="form-group w-75 py-2">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="form-group w-75 py-2">
                    <label for="repassword">Re-Enter Password</label>
                    <input type="password" className="form-control" id="repassword" onChange={(e) => { setRepassword(e.target.value) }} />
                </div>
            </from>

            <div className='text-info'>{ack}</div>
            <button className='btn btn-primary w-50 mt-2' onClick={submitHandler}>SignUp</button>
        </>
    )
}

export default Signup