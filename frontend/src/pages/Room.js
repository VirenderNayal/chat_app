import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useSocket } from '../providers/Socket'
import { useNavigate } from 'react-router-dom';

function Room() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));
    const [roomId, setRoomId] = useState();
    const navigate = useNavigate();
    const { socket } = useSocket();

    const handleRoomJoined = useCallback(({ roomId }) => {
        navigate(`/chat/${roomId}`);
    }, [navigate])

    const handleJoinRoom = async () => {
        const email = user.email
        socket.emit("join-room", { email, roomId });
    }

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    }

    useEffect(() => {
        socket.on('joined-room', handleRoomJoined);

        return () => {
            socket.off('joined-room', handleRoomJoined);
        }
    }, [socket, handleRoomJoined])


    return (
        <div className='d-flex flex-column align-items-center vh-100'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,100,0,0" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,100,0,0" />

            <Navbar />

            <div className='d-flex flex-column text-white align-items-center justify-content-center h-75 w-75 border m-auto section-blur rounded'>
                <div className='d-flex w-100 h2 mt-5 align-items-center justify-content-center'>
                    <div className='border mx-3' style={{ height: "50px", width: "50px", borderRadius: "30px", backgroundImage: "url(" + `${user.pic}` + ")" }} />
                    Hello, {user.name}
                    <button onClick={handleLogout} className='btn btn-danger mx-5' style={{ marginLeft: "auto" }}>Logout</button>
                </div>
                <div className='d-flex text-white align-items-center justify-content-center h-100 w-100'>
                    <div className='d-flex flex-column h-75 w-25 border align-items-center justify-content-center rounded mx-5'>
                        <span style={{ fontSize: "100px" }} className="material-symbols-outlined">
                            add_circle
                        </span>
                        <div className="form-group w-75 py-1">
                            <label for="email">Chat id : </label>
                            <input type="email" className="form-control" id="email" onChange={(e) => setRoomId(e.target.value)} />
                        </div>
                        <button className='btn btn-info my-2' onClick={handleJoinRoom}>
                            Create a Chat
                        </button>
                    </div>

                    <div className='d-flex flex-column h-75 w-25 border align-items-center justify-content-center rounded mx-5'>
                        <span style={{ fontSize: "100px" }} className="material-symbols-outlined">
                            login
                        </span>
                        <div className="form-group w-75 py-1">
                            <label for="email">Chat id : </label>
                            <input type="email" className="form-control" id="email" onChange={(e) => setRoomId(e.target.value)} />
                        </div>
                        <button className='btn btn-success my-2' onClick={handleJoinRoom}>
                            Join a Chat
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Room