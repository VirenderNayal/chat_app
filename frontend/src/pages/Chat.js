import React, { useCallback, useEffect } from 'react'
import Navbar from '../components/Navbar'
import CustomIconButton from '../components/CustomIconButton'
import { useSocket } from '../providers/Socket'
import { usePeer } from '../providers/Peer';

function Chat() {
    const { socket } = useSocket();
    const { peer, createOffer, createOfferResponse } = usePeer();

    const handleUserJoined = useCallback(async (data) => {
        const { email } = data;
        const offer = await createOffer();

        socket.emit('call-user', { email, offer });
    }, [createOffer, socket]);

    const handleIncomingCall = useCallback(async (data) => {
        const {fromEmail, offer} = data;

        const res = await createOfferResponse(offer);

        socket.emit('call-accepted', { fromEmail, res});
    }, [socket, createOfferResponse])

    const handleCallAccepted = useCallback(async (data) => {

    }, []);
    useEffect(() => {
        socket.on("user-joined", handleUserJoined);
        socket.on('incoming-call', handleIncomingCall);
        socket.on('call-accepted', handleCallAccepted);

        return () => {
            socket.off("user-joined", handleUserJoined);
            socket.off("incoming-call", handleIncomingCall);
            socket.off('call-accepted', handleCallAccepted);
        }
    }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted])

    return (
        <div className='d-flex flex-column vh-100'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,300,0,0" />
            <Navbar />

            <div className='d-flex flex-column w-100 h-100'>
                <div className='d-flex w-100 h-75 p-2'>
                    <div className='d-flex w-75 section-blur rounded m-3'>
                        <CustomIconButton icon={"mic"} text={"Mute"} />
                    </div>
                    <div className='d-flex w-25 section-blur rounded m-3'>
                        2
                    </div>
                </div>

                <div style={{ height: "40%" }} className='d-flex w-100 p-2'>
                    <div className='d-flex w-50 section-blur rounded mx-3'>
                        <CustomIconButton icon={"chat_bubble"} text={"Chat"} />
                    </div>
                    <div className='d-flex pt-4 flex-column w-25 section-blur rounded mx-3 align-items-center justify-content-center'>
                        <CustomIconButton icon={"pause"} text={"Pause"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat