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

const App = () => {
    // useEffect(() => {
    //     const handleScroll = () => {
    //         let current = "";
    //         sections.forEach((section) => {
    //             const element = document.getElementById(section.id);
    //             if (element) {
    //                 const rect = element.getBoundingClientRect();

    //                 if (
    //                     rect.top <= window.innerHeight / 2 &&
    //                     rect.bottom >= window.innerHeight / 2
    //                 ) {
    //                     current = section.id;
    //                 }
    //             }
    //         });
    //         if (current) setActiveSection(current);
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    return (
        <div className="app">
            <MainContext>
                <Router>
                    <Navigation />
                    <Routes>
                        <Route path="/" Component={Main}></Route>
                    </Routes>
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
            <footer></footer>
            <AuthCallback />
        </div>
    );
};
