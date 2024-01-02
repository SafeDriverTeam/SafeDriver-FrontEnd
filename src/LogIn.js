import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "./api/axios";
const AUTH_URL = "auth/";

function LogIn(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function validateInputs() {
        setEmailError("");
        setPasswordError("");
        let isValid = true;

        if (email === "") {
            setEmailError("El correo electrónico es requerido");
            isValid = false;

        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("El correo electrónico no es válido");
            isValid = false;

        } else if (password === "") {
            setPasswordError("La contraseña es requerida");
            isValid = false;

        } else if (password.length < 8) {
            setPasswordError("La contraseña debe tener al menos 8 caracteres");
            isValid = false;
        }

        return isValid;
    }

    const handleLogIn = async () => {
        if (validateInputs()) {
            await axios.post(AUTH_URL + "login", { 
                email, 
                password 
            })
            .then(function (response) {
                const user = response.data.user;
                    
                if(user.type === "driver") {
                    navigate("/");
                } else if(user.type === "adjuster") {
                    navigate("/");
                } else if(user.type === "executive") {
                    navigate("/");
                } else if(user.type === "admin") {
                    navigate("/registerEmployee");
                }
                
                props.onHide();
            })
            .catch(function (error) {
                if(error.response.status === 401) {
                    setPasswordError("El correo electrónico o la contraseña son incorrectos");
                } else {
                    setPasswordError("Ha ocurrido un error, inténtelo de nuevo más tarde");
                }
            });
        }
    };

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="LogInModal">Inicio de sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="logIn">
                    <div>
                        <Form.Label for="personalEmail" className="inputFieldLabel">
                            Correo electrónico *
                        </Form.Label>
                        <Form.Control
                            id="personalEmail"
                            type="email"
                            placeholder="example@safedriver.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Label className="labelError">
                            {emailError}
                        </Form.Label>
                    </div>
                    <div>
                        <Form.Label for="pass" className="inputFieldLabel">Contraseña *</Form.Label>
                        <Form.Control
                            id="pass"
                            type={showPassword ? "text" : "password"}
                            placeholder="**********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Label className="labelError">
                            {passwordError}
                        </Form.Label>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={handleLogIn}
                    className="logInButton"
                >
                    Iniciar sesión
                </Button>{" "}
            </Modal.Footer>
        </Modal>
    );
}

export default LogIn;
