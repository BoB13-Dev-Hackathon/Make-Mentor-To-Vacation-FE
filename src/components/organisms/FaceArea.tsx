import React, { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../../context/contexts';


function FaceArea() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { receiving } = useContext(ChatContext);

    useEffect(() => {
        if (!videoRef.current)
            return;
        if (receiving) {
            videoRef.current.play();
        }
        else {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [receiving]);


    return (
        <div className='flex flex-1 p-3 h-screen justify-center'>
            <video 
                src='/gilgil.mp4' 
                ref={videoRef} 
                className='rounded h-full'
                loop
                muted
                />
        </div>
    )
}

export default FaceArea;