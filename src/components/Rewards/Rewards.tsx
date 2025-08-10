const Rewards = () => {
    return (
        <>
            <div className="rewards">
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
                            <img src="" alt="" />
                            <div className="rewardButtonText">
                                <h3>Discord nitro basic</h3>
                                <div className="buttonLine"></div>
                                <p>2,000 Points</p>
                            </div>
                        </button>
                        <button className="rewardButton">
                            <img src="" alt="" />
                            <div className="rewardButtonText">
                                <h3>Custom server role</h3>
                                <div className="buttonLine"></div>
                                <p>1,000 Points</p>
                            </div>
                        </button>
                    </div>
                </div>
                <button className="rewardsSignIn">
                    <img src="" alt="" />
                    <h2>Sign in to start earning rewards</h2>
                </button>
            </div>
        </>
    );
};

export default Rewards;
