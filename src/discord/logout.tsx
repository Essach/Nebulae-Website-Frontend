import { signOut } from "firebase/auth";
import { auth } from "../firebaseApp";
import { changeUsername } from "../helpers/localStorage";

function LogoutButton() {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            changeUsername("");
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
