import React from 'react';
import { Button } from "@nextui-org/button";

import { ReactComponent as SendIcon } from '../atoms/prime--send.svg'
import { ReactComponent as VoiceIcon } from '../atoms/iconoir--voice.svg'
import {
    Input,
} from '@nextui-org/react';

function Chatarea() {
    return (
        <div className="flex flex-col gap-4 items-end">
            <div className='flex-1'>
                
            </div>
            <div className='flex w-full gap-1 items-stretch'>
                <Input className='flex-1'/>
                <Button isIconOnly color="danger" variant="faded" aria-label="Send message">
                    <VoiceIcon style={{ width: "70%", height: "70%" }} />
                </Button>
                <Button isIconOnly color="warning" variant="faded" aria-label="Send message">
                    <SendIcon style={{ width: "70%", height: "70%" }} />
                </Button>
            </div>
        </div>
    )
}

export default Chatarea;