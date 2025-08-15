import { useLocation } from "react-router-dom";
import nitro from "../../images/nitro.png";
import nitroPremium from "../../images/nitroPremium.png";
import woo from "../../images/woo.png";
import "./RewardsShop.scss";
import { useEffect } from "react";
import { useUser } from "../../context/UserContext/UserContext";
import request from "../../helpers/request.ts";
import { auth } from "../../firebaseApp.ts";

const RewardsShop = () => {
    const { pathname } = useLocation();

    const userData = useUser();
    const uid = userData.uid;

    const handleCheckBonus = async (bonusType: string) => {
        const { data, status } = await request.get("/bonuses/check", {
            params: {
                userId: uid,
                bonusType: bonusType,
            },
        });
        console.log("hi");
        console.log(data, status);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div>
            {auth.currentUser ? (
                <div className="rewardsShop">
                    <div className="earnPoints">
                        <div className="earnPointsTop">
                            <h1 className="earnPointsTitle">Earn points</h1>
                            <div className="titleLine"></div>
                        </div>
                        <div className="earnPointsShop">
                            <div className="signUpBonus">
                                <div className="infoLabel">
                                    <div className="labelText">
                                        <h4 className="desc">Sign up bonus</h4>
                                        <div className="textLine"></div>
                                        <p className="pointsAmount">
                                            300 points
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className="check"
                                    onClick={async () =>
                                        await handleCheckBonus("signUp")
                                    }
                                >
                                    Check for availability
                                </button>
                            </div>
                            <div className="serverBoost">
                                <div className="infoLabel">
                                    <div className="labelText">
                                        <h4 className="desc">Server boost</h4>
                                        <div className="textLine"></div>
                                        <p className="pointsAmount">
                                            200 points
                                        </p>
                                    </div>
                                </div>
                                <button className="check">
                                    Check for availability
                                    <span>{`(available every month)`}</span>
                                </button>
                            </div>
                            <div className="serverSub">
                                <div className="infoLabel">
                                    <div className="labelText">
                                        <h4 className="desc">
                                            Server subscription
                                        </h4>
                                        <div className="textLine"></div>
                                        <p className="pointsAmount">
                                            400 points
                                        </p>
                                    </div>
                                </div>
                                <button className="check">
                                    Check for availability
                                    <span>{`(available every month)`}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="pointsShop">
                        <div className="pointsShopTop">
                            <h1 className="pointsShopTitle">Points shop </h1>
                            <div className="titleLine"></div>
                        </div>
                        <div className="shopButtons">
                            <button className="nitroBasic">
                                <img src={nitro} alt="" />
                                <div className="rewardButtonText">
                                    <h3>Discord nitro basic</h3>
                                    <div className="buttonLine"></div>
                                    <p>2,000 Points</p>
                                </div>
                            </button>
                            <button className="nitroPremium">
                                <img src={nitroPremium} alt="" />
                                <div className="rewardButtonText">
                                    <h3>Discord nitro premium</h3>
                                    <div className="buttonLine"></div>
                                    <p>3,000 Points</p>
                                </div>
                            </button>
                            <button className="customRole">
                                <img src={woo} alt="" />
                                <div className="rewardButtonText">
                                    <h3>Custom server role</h3>
                                    <div className="buttonLine"></div>
                                    <p>1,000 Points</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="noUserRewards">
                    Log in to see the rewards shop!
                </div>
            )}
        </div>
    );
};

export default RewardsShop;
