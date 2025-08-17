import axios from "axios";

const request = axios.create({
    baseURL: "https://nebulae-website-backend.vercel.app",
    validateStatus: () => true,
});

export default request;
