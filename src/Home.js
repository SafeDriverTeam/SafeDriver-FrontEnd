import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Cookies from "js-cookie";
import './css/App.css';

function Home() {
    const [modalLoginShow, setModalLoginShow] = React.useState(false);
    const [modalSignUpShow, setModalSignUpShow] = React.useState(false);

    useEffect(() => {
        Cookies.remove("token");
        localStorage.removeItem("user");
    }, []);

    return (
        <div>
            <div className="bgImage"></div>
            <div className="home container-fluid">
                <div className="cardStyle">
                    <h1 className="homeTitle">Bienvenido</h1>
                    <h2 className="titlePage">a SafeDriver</h2>
                    <p className="homeText">
                        Te acompañamos en tu día a día para que vivas tranquilo,
                        protegiéndote a ti, tu auto y a los que más quieres.
                    </p>
                    <div>
                        <button
                            className="primaryButton"
                            onClick={() => setModalLoginShow(true)}
                        >
                            Iniciar sesión
                        </button>{" "}
                        <LogIn
                            show={modalLoginShow}
                            onHide={() => setModalLoginShow(false)}
                        />
                        <hr></hr>
                        <button
                            variant="secondary"
                            className="secondaryButton"
                            onClick={() => setModalSignUpShow(true)}
                        >
                            Registrarse
                        </button>{" "}
                        <SignUp
                            show={modalSignUpShow}
                            onHide={() => setModalSignUpShow(false)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
