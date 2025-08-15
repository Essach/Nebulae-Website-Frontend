import { useLocation } from "react-router-dom";
import nitro from "../../images/nitro.png";
import nitroPremium from "../../images/nitroPremium.png";
import woo from "../../images/woo.png";
import "./RewardsShop.scss";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext/UserContext";
import request from "../../helpers/request.ts";
import { auth } from "../../firebaseApp.ts";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import getUserPoints from "../User/getPoints.ts";
import { usePoints } from "../../context/PointsContext/PointsContext.ts";
import { CircleLoader } from "react-spinners";

const RewardsShop = () => {
    const [currentAlert, setCurrentAlert] = useState<string>("");
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertOpen, setAlertOpen] = useState<boolean>(false);

    const [isRedeeming, setIsRedeeming] = useState<boolean>(false);

    const { pathname } = useLocation();

    const userData = useUser();
    const uid = userData.uid;

    const context = usePoints();
    const { setPoints } = context;

    const cleanAlert = () => {
        setCurrentAlert("");
        setAlertMessage("");
    };

    const handleRedeemBonus = async (bonusType: string) => {
        cleanAlert();
        setAlertOpen(false);
        setIsRedeeming(true);
        const { data, status } = await request.get("/bonuses/redeem", {
            params: {
                userId: uid,
                bonusType: bonusType,
            },
        });
        if (status == 200) {
            if (data.available) {
                const points = await getUserPoints();
                setPoints(points);
                setCurrentAlert("success");
                setAlertMessage("Successfully redeemed points.");
                setAlertOpen(true);
                setTimeout(() => {
                    setAlertOpen(false);
                    cleanAlert();
                }, 2000);
            } else {
                setCurrentAlert("wrong");
                setAlertMessage("You are not eligible to redeem these points.");
                setAlertOpen(true);
                setTimeout(() => {
                    setAlertOpen(false);
                    cleanAlert();
                }, 2000);
            }
        } else {
            setCurrentAlert("error");
            setAlertMessage("Something went wrong. Try again later.");
            setAlertOpen(true);
            setTimeout(() => {
                setAlertOpen(false);
                cleanAlert();
            }, 2000);
        }
        setIsRedeeming(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div>
            {auth.currentUser ? (
                <>
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
                                            <h4 className="desc">
                                                Sign up bonus{" "}
                                                <span>{`(One time)`}</span>
                                            </h4>
                                            <div className="textLine"></div>
                                            <p className="pointsAmount">
                                                300 points
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        className="redeem"
                                        onClick={async () =>
                                            await handleRedeemBonus("signUp")
                                        }
                                    >
                                        Redeem points
                                    </button>
                                </div>
                                <div className="serverBoost">
                                    <div className="infoLabel">
                                        <div className="labelText">
                                            <h4 className="desc">
                                                Server boost{" "}
                                                <span>{`(Every month)`}</span>
                                            </h4>
                                            <div className="textLine"></div>
                                            <p className="pointsAmount">
                                                200 points
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        className="redeem"
                                        onClick={async () =>
                                            await handleRedeemBonus(
                                                "serverBoost"
                                            )
                                        }
                                    >
                                        Redeem points
                                    </button>
                                </div>
                                <div className="serverSub">
                                    <div className="infoLabel">
                                        <div className="labelText">
                                            <h4 className="desc">
                                                Server subscription{" "}
                                                <span>{`(Every month)`}</span>
                                            </h4>
                                            <div className="textLine"></div>
                                            <p className="pointsAmount">
                                                400 points
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        className="redeem"
                                        onClick={async () =>
                                            await handleRedeemBonus(
                                                "serverSubscription"
                                            )
                                        }
                                    >
                                        Redeem points
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="pointsShop">
                            <div className="pointsShopTop">
                                <h1 className="pointsShopTitle">
                                    Points shop{" "}
                                </h1>
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
                    <div
                        className={`rewardsAlert ${
                            alertOpen ? "alertVisible" : "alertHidden"
                        }`}
                    >
                        {currentAlert == "success" ? (
                            <FaRegCheckSquare
                                size={30}
                                fill="green"
                                filter="drop-shadow(0px 0px 1px green)"
                            />
                        ) : (
                            ""
                        )}
                        {currentAlert == "wrong" ? (
                            <MdOutlineCancel
                                size={30}
                                fill="red"
                                filter="drop-shadow(0px 0px 1px red)"
                            />
                        ) : (
                            ""
                        )}
                        {currentAlert == "error" ? (
                            <MdErrorOutline
                                size={30}
                                fill="orange"
                                filter="drop-shadow(0px 0px 1px orange)"
                            />
                        ) : (
                            ""
                        )}
                        <p>{alertMessage}</p>
                    </div>
                </>
            ) : (
                <div className="noUserRewards">
                    Log in to see the rewards shop!
                </div>
            )}
            {isRedeeming ? (
                <div className="redeemingScreen">
                    <CircleLoader size={200} color="#FFFFFF" />
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default RewardsShop;
