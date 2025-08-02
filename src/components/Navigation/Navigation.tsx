import logo from "../../images/logo.png";
import discord from "../../images/discord.png";
import "./Navigation.scss";
import { useState } from "react";

const Navigation = () => {
    const [activeSection, setActiveSection] = useState<string>("home");

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
            </div>
        </div>
    );
};

export default Navigation;
