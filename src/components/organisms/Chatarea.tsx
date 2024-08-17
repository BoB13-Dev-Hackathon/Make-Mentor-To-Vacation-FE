import React, {
    useContext,
    useEffect,
    useRef,
} from 'react';
import { Button } from '@nextui-org/button';

import { ReactComponent as SendIcon } from '../atoms/prime--send.svg'
import { ReactComponent as VoiceIcon } from '../atoms/iconoir--voice.svg'
import { ReactComponent as StopIcon } from '../atoms/material-symbols--stop.svg'
import {
    Input,
    ScrollShadow,
} from '@nextui-org/react';
import { ChatContext } from '../../context/contexts';
import useSpeechToText from '../../hooks/useSpeechToText';


function ChatArea() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { transcript, listening, toggleListening, resetTranscript } = useSpeechToText();

    const { 
        receiving, 
        receiveChat, 
        chats,
        prompt,
        setPrompt, 
        sendChat, 
        stopChat 
    } = useContext(ChatContext);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [receiveChat]);

    useEffect(() => {
        if (transcript != '')
            setPrompt(transcript);
    }, [transcript, setPrompt]);
    useEffect(() => {
        resetTranscript();
    }, [listening])

    return (
        <div className='flex flex-col gap-4 h-screen p-3 rounded w-96'>
            <ScrollShadow hideScrollBar className='flex-1 flex-col justify-end w-full' ref={scrollRef}>
                {chats.map(chat => (
                    <div className='w-full bg-gray-50 rounded mt-2 br-2 p-2 flex-col' key={chat.text}>
                        <div>
                            {chat.sender}
                        </div>
                        <div>
                            {chat.text}
                        </div>
                    </div>
                ))}
                {receiving
                    ? <div className='w-full bg-gray-50 rounded mt-2 br-2 p-2 flex-col'>
                        <div>
                            gilgil
                        </div>
                        <div>
                            {receiveChat}
                        </div>
                    </div>
                    : <></>
                }
            </ScrollShadow>
            <div className='flex w-full gap-1 items-stretch'>
                <Input className='flex-1' value={prompt} onChange={e => setPrompt(e.target.value)} />
                <Button 
                    isIconOnly 
                    color='danger' 
                    variant={ listening ? 'solid' : 'faded' }
                    aria-label='Send message'
                    onClick={() => toggleListening()}
                >
                    <VoiceIcon style={{ width: '70%', height: '70%' }} />
                </Button>
                <Button
                    isIconOnly
                    color='warning'
                    variant='faded'
                    aria-label='Send message'
                    onClick={() => {
                        if (receiving) stopChat();
                        else sendChat();
                    }}
                >
                    {receiving
                        ? <StopIcon style={{ width: '70%', height: '70%' }} />
                        : <SendIcon style={{ width: '70%', height: '70%' }} />
                    }
                </Button>
            </div>
        </div>
    )
}

export default ChatArea;