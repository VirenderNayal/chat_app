import React, { useCallback, useEffect, useMemo, useState } from 'react'

const PeerContext = React.createContext(null);

export const usePeer = () => React.useContext(PeerContext); 

export const PeerProvider = (props) => {
    const peer = useMemo(() => new RTCPeerConnection(), []);
    const [remoteStream, setRemoteStream] = useState(null);

    const createOffer = async () => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        return offer;
    }

    const createOfferResponse = async (offer) => {
        await peer.setRemoteDescription(offer);
        const offerResponse = await peer.createAnswer();
        await peer.setLocalDescription(offerResponse);

        return offerResponse;
    }

    const setRemoteResponse = async (res) => {
        await peer.setRemoteDescription(res);
    }

    const sendStream =  async (stream) => {
        const tracks = stream.getTracks();
        for(const track of tracks){
            peer.addTrack(track, stream);
        }
    }

    const handleTrackEvent = useCallback((event) => {
        const streams = event.streams;
            setRemoteStream(streams[0]);
    }, [])

    useEffect(() => {
        peer.addEventListener('track', handleTrackEvent);

        return () => {
            peer.removeEventListener('track', handleTrackEvent);
        }
    }, [peer, handleTrackEvent]);
    
    return (
        <PeerContext.Provider value={{peer, createOffer, createOfferResponse, setRemoteResponse, sendStream, remoteStream}}>
            {props.children}
        </PeerContext.Provider>
    )
}