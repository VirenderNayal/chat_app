import React, { useMemo } from 'react'

const PeerContext = React.createContext(null);

export const usePeer = () => React.useContext(PeerContext); 

export const PeerProvider = (props) => {
    const peer = useMemo(() => new RTCPeerConnection(), []);

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
    return (
        <PeerContext.Provider value={{peer, createOffer, createOfferResponse}}>
            {props.children}
        </PeerContext.Provider>
    )
}