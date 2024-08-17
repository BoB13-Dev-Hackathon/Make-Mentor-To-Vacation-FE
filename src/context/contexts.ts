import { createContext } from "react";
import { Chat } from "./types";

export const ChatContext = createContext({
    receiving: false,
    talking: false,
    receiveChat: '',
    prompt: '',
    userMediaStream: null as MediaStream | null,
    chats: [] as Chat[],
    sendChat: () => {},
    stopChat: () => {},
    setPrompt: (_:string) => {}
});
