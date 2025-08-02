import "./App.scss";
import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";

const App = () => {
    return (
        <div className="app">
            <Navigation />
            <Home />
        </div>
    );
};

export default App;
