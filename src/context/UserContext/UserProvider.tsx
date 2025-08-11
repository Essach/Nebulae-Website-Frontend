import { useState } from "react";
import { UserContext, type UserContextType } from "./UserContext";

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [username, setUsername] = useState<string>("");

    const value: UserContextType = { username, setUsername };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export default UserProvider;
