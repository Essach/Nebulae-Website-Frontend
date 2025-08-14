import React, { createContext, useContext } from "react";

export interface UserContextType {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    uid: string;
    setUid: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("Must be inside UserProvider");
    return context;
};
