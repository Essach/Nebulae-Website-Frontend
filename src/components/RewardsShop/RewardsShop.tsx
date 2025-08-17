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
    const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

    const [isRedeeming, setIsRedeeming] = useState<boolean>(false);

    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const [currentReward, setCurrentReward] = useState<string>("");
    const [currentRewardCost, setCurrentRewardCost] = useState<string>("");
    const [currentRewardNormal, setCurrentRewardNormal] = useState<string>("");

    const { pathname } = useLocation();

    const userData = useUser();
    const uid = userData.uid;

    const context = usePoints();
    const { setPoints } = context;

    const cleanConfirmation = () => {
        setCurrentReward("");
        setCurrentRewardCost("");
        setCurrentRewardNormal("");
    };

    const handleRedeemBonus = async (bonusType: string) => {
        setAlertOpen(false);
        setIsRedeeming(true);
        const { data, status } = await request.post("/rewards/bonus", {
            userId: uid,
            bonusType: bonusType,
        });
        if (status == 200) {
            if (data.available) {
                const points = await getUserPoints();
                setPoints(points);
                setCurrentAlert("success");
                setAlertMessage("Successfully redeemed points.");
                setAlertOpen(true);
                cancelTimeout();
                setTimeoutId(
                    setTimeout(() => {
                        setAlertOpen(false);
                    }, 2000)
                );
            } else {
                setCurrentAlert("wrong");
                setAlertMessage("You are not eligible to redeem these points.");
                setAlertOpen(true);
                cancelTimeout();
                setTimeoutId(
                    setTimeout(() => {
                        setAlertOpen(false);
                    }, 2000)
                );
            }
        } else {
            setCurrentAlert("error");
            setAlertMessage("Something went wrong. Try again later.");
            setAlertOpen(true);
            cancelTimeout();
            setTimeoutId(
                setTimeout(() => {
                    setAlertOpen(false);
                }, 2000)
            );
        }
        setIsRedeeming(false);
    };

    const handleRedeemReward = async (rewardType: string) => {
        setConfirmationOpen(false);
        cleanConfirmation();
        setAlertOpen(false);
        setIsRedeeming(true);
        const { data, status } = await request.post("/rewards/bonus", {
            userId: uid,
            rewardType: rewardType,
        });
        if (status == 200) {
            const points = await getUserPoints();
            setPoints(points);
            setCurrentAlert("success");
            setAlertMessage("Successfully redeemed reward.");
            setAlertOpen(true);
            cancelTimeout();
            setTimeoutId(
                setTimeout(() => {
                    setAlertOpen(false);
                }, 2000)
            );
        } else if (status == 406) {
            setCurrentAlert("wrong");
            setAlertMessage(
                "You have insufficient points to redeem this reward."
            );
            setAlertOpen(true);
            cancelTimeout();
            setTimeoutId(
                setTimeout(() => {
                    setAlertOpen(false);
                }, 2000)
            );
        } else {
            setCurrentAlert("error");
            setAlertMessage("Something went wrong. Try again later.");
            setAlertOpen(true);
            cancelTimeout();
            setTimeoutId(
                setTimeout(() => {
                    setAlertOpen(false);
                }, 2000)
            );
            console.log(data.message);
        }
        setIsRedeeming(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const id = setTimeout(() => {
            console.log("This will not run if you cancel");
        }, 5000);
        setTimeoutId(id);

        return () => clearTimeout(id); // cleanup on unmount
    }, []);

    const cancelTimeout = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };

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
                                <div className="levelBonus">
                                    <div className="infoLabel">
                                        <div className="labelText">
                                            <h4 className="desc">
                                                Level bonus{" "}
                                                <span>{`(Every 5 levels)`}</span>
                                            </h4>
                                            <div className="textLine"></div>
                                            <p className="pointsAmount">
                                                25 points
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        className="redeem"
                                        onClick={async () =>
                                            await handleRedeemBonus(
                                                "levelBonus"
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
                                <h1 className="pointsShopTitle">Points shop</h1>
                                <div className="titleLine"></div>
                            </div>
                            <div className="shopButtons">
                                <button
                                    className="nitroBasic"
                                    onClick={() => {
                                        setConfirmationOpen(true);
                                        setCurrentReward("nitroBasic");
                                        setCurrentRewardCost("2000");
                                        setCurrentRewardNormal("Nitro Basic");
                                    }}
                                >
                                    <img src={nitro} alt="" />
                                    <div className="rewardButtonText">
                                        <h3>Discord nitro basic</h3>
                                        <div className="buttonLine"></div>
                                        <p>2,000 Points</p>
                                    </div>
                                </button>
                                <button
                                    className="nitroPremium"
                                    onClick={() => {
                                        setConfirmationOpen(true);
                                        setCurrentReward("nitroPremium");
                                        setCurrentRewardCost("3000");
                                        setCurrentRewardNormal("Nitro Premium");
                                    }}
                                >
                                    <img src={nitroPremium} alt="" />
                                    <div className="rewardButtonText">
                                        <h3>Discord nitro premium</h3>
                                        <div className="buttonLine"></div>
                                        <p>3,000 Points</p>
                                    </div>
                                </button>
                                <button
                                    className="customRole"
                                    onClick={() => {
                                        setConfirmationOpen(true);
                                        setCurrentReward("serverRole");
                                        setCurrentRewardCost("1000");
                                        setCurrentRewardNormal(
                                            "Custom Server Role"
                                        );
                                    }}
                                >
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
                    {confirmationOpen ? (
                        <div className="backdrop">
                            <div className="confirmationWindow">
                                <p>
                                    {`
                                    Are you sure you want to redeem ${currentRewardNormal} reward for ${currentRewardCost} points?`}
                                </p>
                                <div className="buttons">
                                    <button
                                        className="cancel"
                                        onClick={() => {
                                            setConfirmationOpen(false);
                                            cleanConfirmation();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="redeem"
                                        onClick={async () => {
                                            await handleRedeemReward(
                                                currentReward
                                            );
                                        }}
                                    >
                                        Redeem
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
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
