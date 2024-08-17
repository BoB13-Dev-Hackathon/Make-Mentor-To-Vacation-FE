import React, { useState, PropsWithChildren } from "react";
import { CountContext } from "./contexts";
// import { useRawState } from "../hooks/StickyState";

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <CountContextProvider>
            {children}
        </CountContextProvider>
    );
};

const CountContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [count, setCount] = useState(0);
    
    const state = {
        count,
        setCount
    };

    return (
        <CountContext.Provider value={state}>
            {children}
        </CountContext.Provider>
    );
};

export default Provider;