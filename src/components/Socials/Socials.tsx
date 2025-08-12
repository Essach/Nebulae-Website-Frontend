import discord from "../../images/discord.png";
import twitter from "../../images/twitter.png";
import "./Socials.scss";

const Socials = () => {
    return (
        <div className="socials" id="socials">
            <div className="socialsTop">
                <h1 className="socialsTitle">Check ut our socials!</h1>
                <div className="titleLine"></div>
            </div>
            <div className="socialsButtons">
                <button className="socialDiscord">
                    <img src={discord} alt="" />
                    Nebulae - Pride Community Discord Server
                </button>
                <button className="socialTwitter">
                    <img src={twitter} alt="" />
                    Nebulae Discord Server's official X profile
                </button>
            </div>
        </div>
    );
};

export default Socials;
