import "./Home.scss";
import discord from "../../images/discord.png";
const Home = () => {
    return (
        <div className="home">
            <div className="homeTop">
                <h1 className="title">
                    <span className="top">One universe.</span>
                    <span className="bottom">Every color.</span>
                </h1>
                <p className="desc">
                    A vibrant space among the stars — Nebulae is a community
                    built on pride, inclusivity, and genuine connection. Whether
                    you're here to make friends, express yourself, or just vibe
                    in a safe, supportive environment, you're welcome exactly as
                    you are.
                </p>
            </div>
            <a target="_blank" href="https://discord.com/invite/6SgE58yd6z">
                <button className="discordJoin">
                    <img src={discord} alt="" />
                    <p>Join our server!</p>
                </button>
            </a>
        </div>
    );
};

export default Home;
