import React, { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../../context/contexts';


function FaceArea() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { talking } = useContext(ChatContext);

    useEffect(() => {
        if (!videoRef.current)
            return;
        if (talking) {
            videoRef.current.play();
        }
        else {
            setTimeout(() => {
                if (!videoRef.current)
                    return;
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }, 1000);
        }
    }, [talking]);


    return (
        <div className='flex flex-1 h-full justify-center p-3'>
            <div className='h-full w-full rounded bg-black shadow-md'>
                <video 
                    src='/gilgil.mp4' 
                    ref={videoRef} 
                    className='rounded h-full'
                    loop
                    muted
                    />
            </div>
        </div>
    )
}

export default FaceArea;