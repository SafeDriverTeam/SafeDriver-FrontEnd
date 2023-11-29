import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegisterEmployee from "./RegisterEmployee";
import "./css/App.css";
import ReportList from "./components/ReportList";

function App() {
    return (
        <div className="App">
            <ReportList />
        </div>
    );
}

export default App;
