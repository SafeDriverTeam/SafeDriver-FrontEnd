import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegisterEmployee from "./RegisterEmployee";
import "./css/App.css";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/registerEmployee" element={<RegisterEmployee />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
