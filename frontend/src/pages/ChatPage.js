import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import CustomIconButton from '../components/CustomIconButton'
import { useSocket } from '../providers/Socket'
import { usePeer } from '../providers/Peer';
import ReactPlayer from 'react-player';
import VideoCall from '../components/VideoCall';
import Texting from '../components/Texting';
import botVideo from "../sakshi.mp4"

function ChatPage() {
    const { socket } = useSocket();
    const { peer, createOffer, createOfferResponse, setRemoteResponse, sendStream, remoteStream } = usePeer();
    const [myStream, setMyStream] = useState(null);
    const [remoteEmail, setRemoteEmail] = useState();
    const [pauseText, setPauseText] = useState("Pause");
    const [pauseIcon, setPauseIcon] = useState("pause");
    const [switchIcon, setSwitchIcon] = useState("chat")
    const [switchText, setSwitchText] = useState("Chat");

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
        socket.emit("call-user", { email: remoteEmail, offer: localOffer })
    }, [peer.localDescription, remoteEmail, socket]);

    const handlePauseClick = () => {
        if (pauseText === "Play") {
            setPauseIcon("pause");
            setPauseText("Pause");
        } else {
            setPauseIcon("play_arrow");
            setPauseText("Play")
        }
    }

    const handleSwitch = () => {
        if (switchIcon === "videocam") {
            setSwitchIcon("chat");
            setSwitchText("Chat");
        } else {
            setSwitchIcon("videocam");
            setSwitchText("Video");
        }
    }

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
        <div className='d-flex flex-column vh-100 vw-100'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,300,0,0" />
            <Navbar />

            <div className='d-flex flex-column w-100 h-100'>
                <div className='d-flex w-100 h-75 p-2'>
                    <div className='d-flex w-75 align-items-center section-blur rounded m-3'>
                        {
                            switchIcon === "chat" ?
                                <VideoCall isSmall={false} stream={myStream} pauseText={pauseText} />
                                :
                                <Texting  isSmall={false} />
                        }
                    </div>
                    <div className='d-flex w-25 section-blur rounded m-3'>
                        {/* <ReactPlayer className="p-2" url={myStream} playing={pauseText === "Pause" ? true : false} muted /> */}
                        <ReactPlayer className='p-2' url={botVideo} playing loop/>
                    </div>
                </div>

                <div style={{ height: "40%" }} className='d-flex w-100 p-2'>
                    <div className='d-flex align-items-center justify-content-evenly w-50 section-blur rounded mx-3'>
                        {
                            switchIcon === "videocam" ?
                                <VideoCall isSmall={true} stream={myStream} pauseText={pauseText}  />
                                :
                                <Texting isSmall={true} />
                        }
                        <div className='d-flex justify-content-center align-items-center mt-5 mx-5'>
                            <CustomIconButton handleClick={handleSwitch} icon={switchIcon} text={switchText} />
                        </div>
                    </div>
                    <div className='d-flex pt-4 flex-column w-25 section-blur rounded mx-3 align-items-center justify-content-center'>
                        <CustomIconButton handleClick={handlePauseClick} icon={pauseIcon} text={pauseText} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;