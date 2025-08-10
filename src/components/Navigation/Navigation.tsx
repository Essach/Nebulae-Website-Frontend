import logo from "../../images/logo.png";
import discord from "../../images/discord.png";
import "./Navigation.scss";
import { useState } from "react";
import DiscordLoginButton from "../../discord/login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseApp.ts";
import type { User } from "firebase/auth";

const Navigation = () => {
    const [activeSection, setActiveSection] = useState<string>("home");
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return unsub;
    }, []);

    return (
        <div className="navigation">
            <img src={logo} alt="" className="logo" />
            <div className="navbar">
                <div className="navigations">
                    <div className="home">
                        {activeSection == "home" && (
                            <div className="light"></div>
                        )}
                        <p
                            onClick={() => {
                                setActiveSection("home");
                            }}
                        >
                            Home
                        </p>
                    </div>
                    <div className="rewards">
                        {activeSection == "rewards" && (
                            <div className="light"></div>
                        )}
                        <p
                            onClick={() => {
                                setActiveSection("rewards");
                            }}
                        >
                            Rewards
                        </p>
                    </div>
                    <div className="contact">
                        {activeSection == "contact" && (
                            <div className="light"></div>
                        )}
                        <p
                            onClick={() => {
                                setActiveSection("contact");
                            }}
                        >
                            Contact
                        </p>
                    </div>
                    <div className="socials">
                        {activeSection == "socials" && (
                            <div className="light"></div>
                        )}
                        <p
                            onClick={() => {
                                setActiveSection("socials");
                            }}
                        >
                            Socials
                        </p>
                    </div>
                </div>
                <div className="navLine"></div>
                <button className="signIn">
                    <img src={discord} alt="discord logo" />
                    <p>Sign in with Discord</p>
                </button>
                {user ? (
                    <h1>Welcome {user.displayName}</h1>
                ) : (
                    <h1>Not logged in</h1>
                )}
                <DiscordLoginButton />
            </div>
        </div>
    );
};

export default Navigation;
