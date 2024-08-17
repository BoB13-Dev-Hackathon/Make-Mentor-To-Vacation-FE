import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../../context/contexts';


const audioContext = (stream: MediaStream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);
    analyser.fftSize = 256; // 256 ~ 2048
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    return { analyser, bufferLength, dataArray };
};

const audioFrequency = (dataArray: Uint8Array, bufferLength: number) => {
    let total = 0;
    for (let i = 0; i < bufferLength; i += 1) {
      total += dataArray[i];
    }
    return total / bufferLength;
};
  


function EffectArea() {
    const [volumn, setVolumn] = useState(0);
    const { userMediaStream } = useContext(ChatContext);

    useEffect(() => {
        if(!userMediaStream)
            return;
        const { analyser, bufferLength, dataArray } = audioContext(userMediaStream);
        const volumnInterval = setInterval(() => {
            analyser.getByteFrequencyData(dataArray);
            const vol = audioFrequency(dataArray, bufferLength);
            setVolumn(Math.floor((vol / 256) * 100));
        }, 30);
        return () => clearInterval(volumnInterval);
    }, [userMediaStream]);

    return (
        <div className='w-20 h-full p-3'>
            <div className='flex flex-col w-full h-full justify-stretch rounded overflow-hidden'>
                <div className='bg-gray-100 flex-auto' style={{height:`${100-volumn}%`}}/>
                <div className='bg-gradient-to-t from-primary-300 to-indigo-400 flex-auto' style={{height:`${volumn}%`}}/>
            </div>
        </div>
    )
}

export default EffectArea;