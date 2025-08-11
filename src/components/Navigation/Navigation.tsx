import logo from "../../images/logo.png";
import "./Navigation.scss";
import { useState } from "react";
import DiscordLoginButton from "../../discord/login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseApp.ts";
import type { User } from "firebase/auth";
import LogoutButton from "../../discord/logout.tsx";
import { usePoints } from "../../context/PointsContext/PointsContext.ts";

const Navigation = () => {
    const [activeSection, setActiveSection] = useState<string>("home");
    const [user, setUser] = useState<User | null>(null);

    const pointsCon = usePoints();
    const { points, loadingPoints } = pointsCon;

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return unsub;
    }, []);

    return (
        <div className="navigation">
            <img src={logo} alt="" className="logo" />
            <div
                className={`navbar ${user ? "navbarLogged" : ""} ${
                    loadingPoints ? "navbarLoading" : ""
                }`}
            >
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
                {loadingPoints ? (
                    <div></div>
                ) : (
                    <>
                        {user ? (
                            <div className="signedIn">
                                <p className="points">Points: {points}</p>
                                <div className="navLine"></div>
                                <p className="user">
                                    Signed in as {user.displayName}
                                </p>
                                <LogoutButton />
                            </div>
                        ) : (
                            <DiscordLoginButton />
                        )}
                    </>
                )}
                {/* {user ? (
                    <div className="signedIn">
                        <p className="points">Points: {points}</p>
                        <div className="navLine"></div>
                        <p className="user">Signed in as {user.displayName}</p>
                        <LogoutButton />
                    </div>
                ) : (
                    <DiscordLoginButton />
                )} */}
            </div>
        </div>
    );
};

export default Navigation;
