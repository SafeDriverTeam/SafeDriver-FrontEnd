import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegisterEmployee from "./RegisterEmployee";
import "./css/App.css";
import RegisterReport from "./RegisterReport";
import HistoryReports from "./HistoryReports";
import AdjusterReport from "./AdjusterReport";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/registerEmployee" element={<RegisterEmployee />} />
                    <Route path="/RegisterReport" element={<RegisterReport/>}/>
                    <Route path ="/HistoryReports" element={<HistoryReports/>}/>
                    <Route path="/adjusterReport" element={<AdjusterReport/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
