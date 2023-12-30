import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import CustomIconButton from '../components/CustomIconButton'
import { useSocket } from '../providers/Socket'
import { usePeer } from '../providers/Peer';
import ReactPlayer from 'react-player';

function Chat() {
    const { socket } = useSocket();
    const { peer, createOffer, createOfferResponse, setRemoteResponse, sendStream, remoteStream } = usePeer();
    const [myStream, setMyStream] = useState(null);
    const [remoteEmail, setRemoteEmail] = useState();

    const handleUserJoined = useCallback(async (data) => {
        const { email } = data;
        const offer = await createOffer();
        console.log("User Joined", email);

        socket.emit('call-user', { email, offer });
        setRemoteEmail(email);
    }, [createOffer, socket]);

    const handleIncomingCall = useCallback(async (data) => {
        const { fromEmail, offer } = data;

        console.log("incoming call", fromEmail);

        const res = await createOfferResponse(offer);

        socket.emit('call-accepted', { fromEmail, res });
        setRemoteEmail(fromEmail);
    }, [socket, createOfferResponse])

    const handleCallAccepted = useCallback(async (data) => {
        const { res } = data;

        console.log("call accepted", res);

        await setRemoteResponse(res);
        sendStream(myStream);
    }, [myStream, sendStream, setRemoteResponse]);

    const getUserMediaStream = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setMyStream(stream);
    }, [])

    const handleNegotiation = useCallback(() => {
        const localOffer = peer.localDescription;
        socket.emit("call-user", {email : remoteEmail, offer : localOffer})
    }, [peer.localDescription, remoteEmail, socket]);

    useEffect(() => {
        peer.addEventListener('negotiationneeded', handleNegotiation);

        return () => {
            peer.removeEventListener('negotiationneeded', handleNegotiation);
        }
    }, [peer, handleNegotiation]);


    useEffect(() => {
        socket.on("user-joined", handleUserJoined);
        socket.on("incoming-call", handleIncomingCall);
        socket.on("call-accepted", handleCallAccepted);

        return () => {
            socket.off("user-joined", handleUserJoined);
            socket.off("incoming-call", handleIncomingCall);
            socket.off("call-accepted", handleCallAccepted);
        }
    }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted])

    useEffect(() => {
        getUserMediaStream();
    }, [getUserMediaStream])

    return (
        <div className='d-flex flex-column vh-100'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,300,0,0" />
            <Navbar />

            <div className='d-flex flex-column w-100 h-100'>
                <div className='d-flex w-100 h-75 p-2'>
                    <div className='d-flex w-75 section-blur rounded m-3'>
                        <CustomIconButton icon={"mic"} text={"Mute"} />
                        <ReactPlayer url={remoteStream} playing />
                    </div>
                    <div className='d-flex w-25 section-blur rounded m-3'>
                        <ReactPlayer url={myStream} playing muted />
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