import "./App.scss";
import AuthCallback from "./components/AuthCallback";
import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
    return (
        <div className="app">
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/" Component={Main}></Route>
                    <Route path="/auth/callback" element={<AuthCallback />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;

const Main = () => {
    return (
        <>
            <Home />
        </>
    );
};
