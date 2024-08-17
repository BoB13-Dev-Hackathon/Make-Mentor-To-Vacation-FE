import React, { useState, PropsWithChildren } from "react";
import { ChatContext } from "./contexts";
import { Chat } from "./types";
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

    let aborter = new AbortController();
    
    const sendChat = () => {
        const tempPrompt = prompt;
        setPrompt('');
        setReceiving(true);
        const myChat: Chat = {
            sender: 'menti',
            text: tempPrompt
        }
        setChats(e => [...e, myChat]);

        async function run() {
            aborter.abort();  // cancel previous request
            aborter = new AbortController();
            setReceiveChat('');
            try {
                const response = await fetch(
                    'http://127.0.0.1:5000/ask', {
                        signal: aborter.signal,
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            prompt: tempPrompt
                        }),
                    }
                );
                if (response.body == null)
                    return;
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let t = '';
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) { break; }
                    const decoded = decoder.decode(value, {stream: true});
                    t += decoded;
                    setReceiveChat(e => e + decoded);
                }
                setReceiving(false);
                const chat: Chat = {
                    sender: 'gilgil',
                    text: t
                }
                setChats(e => [...e, chat]);
            } catch (err) {
                console.error(err);
            }
        }

        run();
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
        receiveChat,
        chats,
        prompt,
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