import React from 'react';
import ChatArea from '../components/organisms/ChatArea';
import FaceArea from '../components/organisms/FaceArea';
import EffectArea from '../components/organisms/EffectArea';


function Main() {

    return (
        <div className='flex'>
            <EffectArea />
            <FaceArea />
            <ChatArea />
        </div>
    )
}

export default Main;