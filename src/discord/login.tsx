const DISCORD_CLIENT_ID = "1404089022480908389";

const REDIRECT_URI =
    "https://nebulae-website-backend.vercel.app/api/auth/discord/callback";
const OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
)}&response_type=code&scope=identify%20email`;

import discord from "../images/discord.png";

export default function DiscordLoginButton() {
    return (
        <button
            className="signIn"
            onClick={() => (window.location.href = OAUTH_URL)}
        >
            <img src={discord} alt="discord logo" />
            <p>Sign in with Discord</p>
        </button>
    );
}
