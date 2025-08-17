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
                <a target="_blank" href="https://discord.com/invite/6SgE58yd6z">
                    <button className="socialDiscord">
                        <img src={discord} alt="" />
                        Nebulae - Pride Community Discord Server
                    </button>
                </a>
                <a target="_blank" href="https://x.com">
                    <button className="socialTwitter">
                        <img src={twitter} alt="" />
                        Nebulae Discord Server's official X profile
                    </button>
                </a>
            </div>
        </div>
    );
};

export default Socials;
