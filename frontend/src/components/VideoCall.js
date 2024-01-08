import React, { useEffect, useState } from 'react'
import CustomIconButton from '../components/CustomIconButton'
import ReactPlayer from 'react-player';

function VideoCall({ stream, isSmall, pauseText }) {
    const [volume, setVolume] = useState(5);
    const [muteText, setMuteText] = useState("Mute");
    const [micIcon, setMicIcon] = useState("mic");

    const handleMuteClick = () => {
        if (volume === 0) {
            setVolume(5);
            setMuteText("Mute");
            setMicIcon("mic");
        } else {
            setVolume(0);
            setMuteText("Unmute");
            setMicIcon("mic_off");
        }
    }

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    }


    return (
        <>
            <div className={`d-flex ${!isSmall && "h-100 mx-5"} w-50 px-3`}>
                <ReactPlayer height={isSmall && "190px"} className="p-2" url={stream} playing={pauseText === "Pause" ? true : false} muted={volume === 0 ? true : false} />
            </div>
            {!isSmall &&
                <div className='d-flex w-50 h-100 alig-items-center'>
                    <div className='d-flex justify-content-center align-items-center mt-5 w-50'>
                        <CustomIconButton handleClick={handleMuteClick} icon={micIcon} text={muteText} />
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center mt-5 w-auto'>
                        <input type='range' onChange={handleVolumeChange} value={volume} defaultValue={volume} min={0} max={10} step={1} style={{ backgroundColor: "black", appearance: "slider-vertical" }} />
                        <div className='m-3 h5 text-white'>{volume}</div>
                        <div className='h5 text-white'>Volume</div>
                    </div>
                </div>
            }
        </>
    )
}

export default VideoCall