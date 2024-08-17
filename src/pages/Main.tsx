import React from 'react';
import ChatArea from '../components/organisms/ChatArea';
import FaceArea from '../components/organisms/FaceArea';
import EffectArea from '../components/organisms/EffectArea';
import NavBar from '../components/organisms/NavBar';


function Main() {

    return (
        <div className='flex flex-col bg-gray-700 items-center h-screen'>
            <div className='flex flex-col max-w-7xl bg-white h-full'>
                <NavBar />
                <div className='flex shadow-xl h-full'>
                    <EffectArea />
                    <FaceArea />
                    <ChatArea />
                </div>
            </div>
        </div>
    )
}

export default Main;