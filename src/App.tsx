import "./App.scss";
// import AuthCallback from "./components/AuthCallback";
import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContext from "./context/MainContext";
import AuthCallback from "./components/User/AuthCallback";

const App = () => {
    return (
        <div className="app">
            <MainContext>
                <Router>
                    <Navigation />
                    <Routes>
                        <Route path="/" Component={Main}></Route>
                        {/* <Route
                            path="/auth/callback"
                            element={<AuthCallback />}
                        /> */}
                    </Routes>
                </Router>
            </MainContext>
        </div>
    );
};

export default App;

const Main = () => {
    return (
        <>
            <Home />
            <AuthCallback />
        </>
    );
};
