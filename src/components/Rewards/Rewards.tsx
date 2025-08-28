import "./Rewards.scss";
import nitro from "../../images/nitro.png";
import woo from "../../images/woo.png";
import discord from "../../images/discord.png";
const DISCORD_CLIENT_ID = "1404089022480908389";
const REDIRECT_URI =
    "https://nebulae-website-backend.vercel.app/api/auth/discord/callback";
const OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
)}&response_type=code&scope=identify%20email`;
import { auth } from "../../firebaseApp";
import { BsGift } from "react-icons/bs";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Rewards = () => {
    const [isLogged, setIsLogged] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        });
        return unsub;
    }, []);

    return (
        <>
            <div className="rewards" id="rewards">
                <div className="earnRewards">
                    <div className="rewardsLeft">
                        <h1 className="rewardsTitle">Earn discord rewards</h1>
                        <div className="line"></div>
                        <p className="rewardsDesc">
                            Join our server, earn points and spend them on
                            various rewards
                        </p>
                    </div>
                    <div className="rewardsButtons">
                        <button className="rewardButton">
                            <img src={nitro} alt="" />
                            <div className="rewardButtonText">
                                <h3>Discord nitro basic</h3>
                                <div className="buttonLine"></div>
                                <p>2,000 Points</p>
                            </div>
                        </button>
                        <button className="rewardButton">
                            <img src={woo} alt="" />
                            <div className="rewardButtonText">
                                <h3>Custom server role</h3>
                                <div className="buttonLine"></div>
                                <p>1,000 Points</p>
                            </div>
                        </button>
                    </div>
                </div>
                {isLogged ? (
                    <button
                        className="rewardsPageButton"
                        onClick={() => {
                            navigate("/rewards");
                        }}
                    >
                        <BsGift size={35} className="img" />
                        <h2>Go to the rewards page</h2>
                    </button>
                ) : (
                    <button
                        className="rewardsSignIn"
                        onClick={() => (window.location.href = OAUTH_URL)}
                    >
                        <img src={discord} alt="" />
                        <h2>Sign in to start earning rewards</h2>
                    </button>
                )}
            </div>
        </>
    );
};

export default Rewards;
