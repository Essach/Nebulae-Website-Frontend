// src/pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../firebaseApp.ts"; // Your firebase initialization

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // Get token from URL query params
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            signInWithCustomToken(auth, token)
                .then((userCredential) => {
                    console.log("Logged in as:", userCredential.user);
                    navigate("/"); // Redirect to wherever you want
                })
                .catch((err) => {
                    console.error("Login failed:", err);
                });
        } else {
            console.error("No token in URL");
        }
    }, [navigate]);

    return <p>Logging you in...</p>;
}
