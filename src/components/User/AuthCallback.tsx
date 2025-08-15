// src/pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../../firebaseApp.ts";
import { usePoints } from "../../context/PointsContext/PointsContext.ts";
import getUserPoints from "./getPoints.ts";
import { changeUsername } from "../../helpers/localStorage.ts";
import { useUser } from "../../context/UserContext/UserContext.ts";

export default function AuthCallback() {
    const navigate = useNavigate();

    const context = usePoints();
    const { setPoints } = context;
    const { setUsername, setUid } = useUser();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            signInWithCustomToken(auth, token)
                .then(async (userCredential) => {
                    console.log("Logged in as:", userCredential.user);
                    console.log(userCredential);
                    if (userCredential.user.displayName) {
                        changeUsername(userCredential.user.displayName);
                        setUsername(userCredential.user.displayName);
                        setUid(userCredential.user.uid);
                    }
                    const points = await getUserPoints();
                    setPoints(points);
                    navigate("/");
                })
                .catch((err) => {
                    console.error("Login failed:", err);
                });
        } else {
            console.error("No token in URL");
        }
    }, [navigate, setPoints, setUid, setUsername]);

    return <></>;
}
