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
import { HashLink } from "react-router-hash-link";

const sections = [
    { id: "home" },
    { id: "rewards" },
    { id: "contact" },
    { id: "socials" },
];

const Navigation = () => {
    const [user, setUser] = useState<User | null>(null);

    const pointsCon = usePoints();
    const { points, loadingPoints } = pointsCon;

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return unsub;
    }, []);

    const [activeSection, setActiveSection] = useState<string>("home");

    useEffect(() => {
        const handleScroll = () => {
            let current = "";
            sections.forEach((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();

                    if (
                        rect.top <= window.innerHeight / 2 &&
                        rect.bottom >= window.innerHeight / 2
                    ) {
                        current = section.id;
                    }
                }
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClickNav = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

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
                        <a
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault();
                                handleClickNav("home");
                            }}
                        >
                            <p
                                onClick={() => {
                                    setActiveSection("home");
                                }}
                            >
                                Home
                            </p>
                        </a>
                    </div>
                    <div className="rewards">
                        {activeSection == "rewards" && (
                            <div className="light"></div>
                        )}
                        <a
                            href="#rewards"
                            onClick={() => {
                                handleClickNav("rewards");
                            }}
                        >
                            <p
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection("rewards");
                                }}
                            >
                                Rewards
                            </p>
                        </a>
                    </div>
                    <div className="contact">
                        {activeSection == "contact" && (
                            <div className="light"></div>
                        )}
                        <a href="#contact">
                            <p
                                onClick={() => {
                                    setActiveSection("contact");
                                }}
                            >
                                Contact
                            </p>
                        </a>
                    </div>
                    <div className="socials">
                        {activeSection == "socials" && (
                            <div className="light"></div>
                        )}
                        <a href="#socials">
                            <p
                                onClick={() => {
                                    setActiveSection("socials");
                                }}
                            >
                                Socials
                            </p>
                        </a>
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
