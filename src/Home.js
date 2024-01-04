import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Cookies from "js-cookie";

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
            <div className="home">
                <div className="cardStyle">
                    <h1 className="homeTitle">Bienvenido</h1>
                    <h2 className="titlePage">a SafeDriver</h2>
                    <p className="homeText">
                        Te acompañamos en tu día a día para que vivas tranquilo,
                        protegiéndote a ti, tu auto y a los que más quieres.
                    </p>
                    <div>
                        <Button
                            variant="primary"
                            className="primaryButton"
                            onClick={() => setModalLoginShow(true)}
                        >
                            Iniciar sesión
                        </Button>{" "}
                        <LogIn
                            show={modalLoginShow}
                            onHide={() => setModalLoginShow(false)}
                        />
                        <hr></hr>
                        <Button
                            variant="secondary"
                            className="primaryButton"
                            onClick={() => setModalSignUpShow(true)}
                        >
                            Registrarse
                        </Button>{" "}
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
