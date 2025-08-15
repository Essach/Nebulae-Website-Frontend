import { signOut } from "firebase/auth";
import { auth } from "../firebaseApp";
import { changeUsername } from "../helpers/localStorage";
import { useUser } from "../context/UserContext/UserContext";

function LogoutButton() {
    const userData = useUser();
    const setUid = userData.setUid;
    const setUsername = userData.setUsername;

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            changeUsername("");
            setUid("");
            setUsername("");
            console.log("Signed out successfully");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <button className="signOut" onClick={handleSignOut}>
            Sign out
        </button>
    );
}

export default LogoutButton;
