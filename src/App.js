import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegisterEmployee from "./RegisterEmployee";
import "./css/App.css";
import RegisterReport from "./RegisterReport";
import HistoryReports from "./HistoryReports";
import AdjusterReport from "./AdjusterReport";
import Start from "./Start";
import BuyInsurancePolicyPage from "./BuyPolicy";
import AssignAdjuster from "./AssignAdjuster";
import UserPolicies from "./UserPolicies";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element= {<Start/>} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/registerEmployee" element={<RegisterEmployee />} />
                    <Route path="/registerReport" element={<RegisterReport/>}/>
                    <Route path="/historyReports" element={<HistoryReports/>}/>
                    <Route path="/adjusterReport" element={<AdjusterReport/>}/>
                    <Route path="*" element={<h1>Not Found</h1>} />
                    <Route path="/:id" element={<h1>Not Found</h1>} />
                    <Route path="/buyPolicy" element={<BuyInsurancePolicyPage />} />
                    <Route path="/assignAdjuster" element={<AssignAdjuster />} />
                    <Route path="/userPolicies" element={<UserPolicies/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
