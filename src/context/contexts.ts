import { createContext } from "react";
import { Chat } from "./types";

export const ChatContext = createContext({
    receiving: false,
    receiveChat: '',
    prompt: '',
    chats: [] as Chat[],
    sendChat: () => {},
    stopChat: () => {},
    setPrompt: (_:string) => {}
});
