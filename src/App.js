import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegisterEmployee from "./RegisterEmployee";
import "./CSS/App.css";
import BuyInsurancePolicyPage from "./BuyPolicy";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/registerEmployee" element={<RegisterEmployee />} />
                    <Route path="/buyPolicy" element={<BuyInsurancePolicyPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
