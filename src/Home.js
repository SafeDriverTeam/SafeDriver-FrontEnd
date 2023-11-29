import React from "react";
import Button from "react-bootstrap/Button";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import AdjusterReport from "./AdjusterReport";

function Home() {
    const [modalLoginShow, setModalLoginShow] = React.useState(false);
    const [modalSignUpShow, setModalSignUpShow] = React.useState(false);
    const [modalAdjusterReportShow, setModalAdjusterReportShow] = React.useState(false);

    return (
        <div className="homeDiv">
            <h1 className="title">Welcome!</h1>
            <Button variant="primary" onClick={() => setModalLoginShow(true)} >
                Iniciar sesión
            </Button>{" "}
            <LogIn show={modalLoginShow} onHide={() => setModalLoginShow(false)} />

            <Button variant="secondary" onClick={() => setModalSignUpShow(true)}>
                Registrarse
            </Button>{" "}
            <SignUp show={modalSignUpShow} onHide={() => setModalSignUpShow(false)} />
        </div>
    );
}

export default Home;
