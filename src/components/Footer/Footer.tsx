import discord from "../../images/discord.png";
import twitter from "../../images/xlogowhite.png";
import "./Footer.scss";
const Footer = () => {
    return (
        <footer>
            <p>© 2025 Nebulae. All rights reserved.</p>
            <div className="links">
                <a target="_blank" href="https://discord.com/invite/6SgE58yd6z">
                    <img src={discord} />
                </a>
                <a target="_blank" href="https://x.com">
                    <img src={twitter} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
