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
import { useLocation, useNavigate } from "react-router-dom";

const sections = [
    { id: "home" },
    { id: "rewards" },
    { id: "contact" },
    { id: "socials" },
];

const Navigation = () => {
    const [user, setUser] = useState<User | null>(null);
    const [usernameLength, setUsernameLength] = useState<number>(0);

    const pointsCon = usePoints();
    const { points, loadingPoints } = pointsCon;

    const [navLinkClicked, setNavLinkClicked] = useState<boolean>(false);

    const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState<string>("home");

    const handleClickNav = (id: string) => {
        setNavLinkClicked(true);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setActiveSection(id);
        setTimeout(() => setNavLinkClicked(false), 500);
    };

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
            if (current && !navLinkClicked) setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navLinkClicked]);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return unsub;
    }, []);

    useEffect(() => {
        const handleTouchScreen = (e: TouchEvent) => {
            const touch = e.touches[0];
            console.log(touch.clientX, touch.clientY);
            if (touch.clientY > 80) {
                setMobileNavOpen(false);
            }
        };

        if (window.innerWidth <= 450) {
            window.addEventListener("touchstart", handleTouchScreen);
        }

        return () => {
            window.removeEventListener("touchstart", handleTouchScreen);
        };
    }, []);

    useEffect(() => {
        if (user?.displayName) {
            setUsernameLength(user.displayName.length);
        }
    }, [user]);

    return (
        <div className="navigation">
            <img src={logo} alt="" className="logo" />
            {window.innerWidth > 450 ? (
                <div
                    className={`navbar ${
                        user
                            ? usernameLength > 14
                                ? "navbarLoggedLong"
                                : "navbarLogged"
                            : ""
                    } ${loadingPoints ? "navbarLoading" : ""} ${
                        location.pathname == "/rewards"
                            ? usernameLength > 14
                                ? "navbarRewardsLong"
                                : ""
                            : "navbarRewards"
                    }
                    } ${
                        location.pathname == "/rewards" && loadingPoints
                            ? "navbarRewardsLoading"
                            : ""
                    }`}
                >
                    <div className="navigations">
                        {location.pathname != "/rewards" ? (
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
                                    <p>Home</p>
                                </a>
                            </div>
                        ) : (
                            <div className="home">
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClickNav("home");
                                        navigate("/");
                                    }}
                                >
                                    <p>Home</p>
                                </a>
                            </div>
                        )}
                        {location.pathname != "/rewards" ? (
                            <div className="rewards">
                                {activeSection == "rewards" && (
                                    <div className="light"></div>
                                )}
                                <a
                                    href="#rewards"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClickNav("rewards");
                                    }}
                                >
                                    <p>Rewards</p>
                                </a>
                            </div>
                        ) : (
                            <div className="rewards">
                                <div className="light"></div>
                                <a
                                    href="#rewards"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClickNav("rewards");
                                    }}
                                >
                                    <p>Rewards</p>
                                </a>
                            </div>
                        )}
                        {location.pathname != "/rewards" ? (
                            <div className="contact">
                                {activeSection == "contact" && (
                                    <div className="light"></div>
                                )}
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClickNav("contact");
                                    }}
                                >
                                    <p>Contact</p>
                                </a>
                            </div>
                        ) : (
                            <></>
                        )}
                        {location.pathname != "/rewards" ? (
                            <div className="socials">
                                {activeSection == "socials" && (
                                    <div className="light"></div>
                                )}
                                <a
                                    href="#socials"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClickNav("socials");
                                    }}
                                >
                                    <p>Socials</p>
                                </a>
                            </div>
                        ) : (
                            <></>
                        )}
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
                                    {location.pathname != "/rewards" ? (
                                        <LogoutButton />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            ) : (
                                <DiscordLoginButton />
                            )}
                        </>
                    )}
                </div>
            ) : (
                <div className="navMobile">
                    <div className="navTop">
                        {user ? (
                            <div className="signedIn">
                                <span>
                                    <p className="user">
                                        Signed in as {user.displayName}
                                    </p>
                                    <p className="points">Points: {points}</p>
                                </span>
                                {location.pathname != "/rewards" ? (
                                    <LogoutButton />
                                ) : (
                                    <></>
                                )}
                            </div>
                        ) : (
                            <DiscordLoginButton />
                        )}
                        <button
                            className="openNavbar"
                            onClick={() => {
                                setMobileNavOpen(true);
                            }}
                        >
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                        </button>
                    </div>
                    <div
                        className={`navbarMobile ${
                            mobileNavOpen ? "navbarMobileOpen" : ""
                        } ${
                            location.pathname == "/rewards"
                                ? "navbarMobileRewards"
                                : ""
                        }`}
                    >
                        {location.pathname != "/rewards" ? (
                            <div className="home">
                                {activeSection == "home" && (
                                    <div className="light"></div>
                                )}
                                <a
                                    href="#home"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClickNav("home");
                                        setMobileNavOpen(false);
                                    }}
                                >
                                    <p>Home</p>
                                </a>
                            </div>
                        ) : (
                            <div className="home">
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClickNav("home");
                                        navigate("/");
                                        setMobileNavOpen(false);
                                    }}
                                >
                                    <p>Home</p>
                                </a>
                            </div>
                        )}
                        {location.pathname != "/rewards" ? (
                            <div className="rewards">
                                {activeSection == "rewards" && (
                                    <div className="light"></div>
                                )}
                                <a
                                    href="#rewards"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClickNav("rewards");
                                        setMobileNavOpen(false);
                                    }}
                                >
                                    <p>Rewards</p>
                                </a>
                            </div>
                        ) : (
                            <div className="rewards">
                                <div className="light"></div>
                                <a
                                    href="#rewards"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClickNav("rewards");
                                        setMobileNavOpen(false);
                                    }}
                                >
                                    <p>Rewards</p>
                                </a>
                            </div>
                        )}
                        {location.pathname != "/rewards" ? (
                            <div className="contact">
                                {activeSection == "contact" && (
                                    <div className="light"></div>
                                )}
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClickNav("contact");
                                        setMobileNavOpen(false);
                                    }}
                                >
                                    <p>Contact</p>
                                </a>
                            </div>
                        ) : (
                            <></>
                        )}
                        {location.pathname != "/rewards" ? (
                            <div className="socials">
                                {activeSection == "socials" && (
                                    <div className="light"></div>
                                )}
                                <a
                                    href="#socials"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClickNav("socials");
                                        setMobileNavOpen(false);
                                    }}
                                >
                                    <p>Socials</p>
                                </a>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navigation;
