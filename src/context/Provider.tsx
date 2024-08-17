import React, { useState, PropsWithChildren } from "react";
import { ChatContext } from "./contexts";
import { Chat } from "./types";
import { ELEVEN_SERVER_URL, SERVER_URL } from "./consts";

// import { useRawState } from "../hooks/StickyState";

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <CountContextProvider>
            {children}
        </CountContextProvider>
    );
};


const CountContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [receiving, setReceiving] = useState(false);
    const [chats, setChats] = useState<Chat[]>([]);
    const [prompt, setPrompt] = useState('');
    const [receiveChat, setReceiveChat] = useState('');
    const [talking, setTalking] = useState(false);
    const [userMediaStream, setUserMediaStream] = useState<MediaStream | null>(null);

    let aborter = new AbortController();
    const getAudio = async (text: string) => {
        try{
            const response = await fetch(
                ELEVEN_SERVER_URL + '/chain', {
                signal: aborter.signal,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: text
                }),
            });
            const base64string = await response.text(); 
            var snd = new Audio("data:audio/mp3;base64," + base64string);
            snd.play();
            setTalking(true);
            snd.onended = () => setTalking(false);
        } catch(e) {
            console.error(e);
        }
    }

    const sendChat = () => {
        const tempPrompt = prompt;
        setPrompt('');
        setReceiving(true);
        const myChat: Chat = {
            sender: 'menti',
            text: tempPrompt
        }
        setChats(e => [...e, myChat]);

        async function stream_run() {
            aborter.abort();  // cancel previous request
            aborter = new AbortController();
            setReceiveChat('');
            try {
                const response = await fetch(
                    SERVER_URL + '/ask', {
                    signal: aborter.signal,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        prompt: tempPrompt
                    }),
                });
                if (response.body == null)
                    return;
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let t = '';
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) { break; }
                    const decoded = decoder.decode(value, { stream: true });
                    t += decoded;
                    setReceiveChat(e => e + decoded);
                }
                setReceiving(false);
                const chat: Chat = {
                    sender: 'gilgil',
                    text: t
                }
                getAudio(t);
                setChats(e => [...e, chat]);
            } catch (err) {
                console.error(err);
            }
        }

        async function json_run() {
            setReceiveChat('');
            try {
                const response = await fetch(
                    SERVER_URL + '/ask', {
                    signal: aborter.signal,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        prompt: tempPrompt
                    }),
                }
                );
                interface resType {
                    response: string
                }
                const res: resType = await response.json();
                console.debug(res);
                setReceiving(false);
                const chat: Chat = {
                    sender: 'gilgil',
                    text: res.response
                }
                getAudio(chat.text);
                setChats(e => [...e, chat]);
            } catch (e) {
                console.error(e);
            }
        }

        // stream_run();
        json_run();
    }

    const stopChat = () => {
        aborter.abort();
        setReceiving(false);
        const chat: Chat = {
            sender: 'gilgil',
            text: receiveChat
        }
        setChats(e => [...e, chat]);
    }

    const state = {
        receiving,
        talking,
        receiveChat,
        chats,
        prompt,
        userMediaStream,
        sendChat,
        stopChat,
        setPrompt
    };

    return (
        <ChatContext.Provider value={state}>
            {children}
        </ChatContext.Provider>
    );
};

export default Provider;