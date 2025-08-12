import "./App.scss";
// import AuthCallback from "./components/AuthCallback";
import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContext from "./context/MainContext";
import AuthCallback from "./components/User/AuthCallback";
import Rewards from "./components/Rewards/Rewards";
import Contact from "./components/Contact/Contact";
import Socials from "./components/Socials/Socials";
import RewardsShop from "./components/RewardsShop/RewardsShop";

const App = () => {
    return (
        <div className="app">
            <div className="shootingStars">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <MainContext>
                <Router>
                    <div className="main">
                        <Navigation />
                        <Routes>
                            <Route path="/" Component={Main}></Route>
                            <Route
                                path="/rewards"
                                Component={RewardsShop}
                            ></Route>
                        </Routes>
                        <footer></footer>
                    </div>
                </Router>
            </MainContext>
        </div>
    );
};

export default App;

const Main = () => {
    return (
        <div>
            <Home />
            <Rewards />
            <Contact />
            <Socials />
            <AuthCallback />
        </div>
    );
};
