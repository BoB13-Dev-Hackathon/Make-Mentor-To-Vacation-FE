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
    Spinner,
} from '@nextui-org/react';
import { ChatContext } from '../../context/contexts';
import useSpeechToText from '../../hooks/useSpeechToText';


function ChatArea() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { transcript, listening, toggleListening, resetTranscript } = useSpeechToText();

    const { 
        receiving,
        talking,
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
    }, [receiveChat, receiving]);

    useEffect(() => {
        if (transcript !== '')
            setPrompt(transcript);
    }, [transcript, setPrompt]);
    useEffect(() => {
        resetTranscript();
    }, [listening, resetTranscript]);

    return (
        <div className='flex flex-col gap-4 h-full p-3 rounded w-96'>
            <ScrollShadow hideScrollBar className='flex-1 flex-col justify-end w-full' ref={scrollRef}>
                {chats.map((chat, i) => (
                    <div 
                        className={`w-full bg-gray-50 rounded mt-2 br-2 p-2 flex flex-col ${chat.sender === 'menti' ? 'items-end' : ''}`} 
                        key={i}>
                        <div className='text-sm font-serif font-bold'>
                            {chat.sender}
                        </div>
                        <div className='text-sm'>
                            {chat.text}
                        </div>
                    </div>
                ))}
                {receiving
                    ? <div className='w-full bg-gray-50 rounded mt-2 br-2 p-2 flex-col min-h-28'>
                        <div className='text-sm font-serif font-bold'>
                            gilgil
                        </div>
                        <div className='relative'>
                            <Spinner 
                                label='멘토님이 생각하시는중...' 
                                color='primary' 
                                className='absolute left-0 top-0 w-full h-full min-h-20' />
                            <div className='text-sm opacity-30'>
                                {receiveChat}
                            </div>
                        </div>
                    </div>
                    : <></>
                }
            </ScrollShadow>
            <div className='flex w-full gap-1 items-stretch'>
                <Input 
                    className='flex-1' 
                    value={prompt} 
                    onChange={e => setPrompt(e.target.value)} 
                    onKeyUp={e => {
                        if(e.key === 'Enter' && !receiving) {
                            sendChat();
                        }
                    }} />
                <Button 
                    isIconOnly 
                    color='danger' 
                    variant={ listening ? 'shadow' : 'faded' }
                    aria-label='Send message'
                    onClick={() => toggleListening()}
                >
                    <VoiceIcon style={{ width: '70%', height: '70%' }} />
                </Button>
                <Button
                    isIconOnly
                    color='primary'
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