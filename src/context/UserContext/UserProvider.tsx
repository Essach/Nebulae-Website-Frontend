import { useEffect, useState } from "react";
import { UserContext, type UserContextType } from "./UserContext";
import getUser from "../../components/User/getUser";
import { auth } from "../../firebaseApp";
import { onAuthStateChanged } from "firebase/auth";
const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [username, setUsername] = useState<string>("");
    const [uid, setUid] = useState<string>("");

    const value: UserContextType = { username, setUsername, uid, setUid };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async () => {
            const userInfo = await getUser();
            if (userInfo) {
                setUsername(userInfo.username);
                setUid(userInfo.uid);
            }
        });
        return unsub;
    }, []);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export default UserProvider;
