import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "./api/axios";
import Cookies from "js-cookie";
const AUTH_URL = "auth/";

function SignUp(props) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userLastNameError, setUserLastNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function validateInputs() {
        setUserNameError("");
        setUserLastNameError("");
        setEmailError("");
        setPasswordError("");
        let isValid = true;

        if (userName === "") {
            setUserNameError("El nombre es requerido");
            isValid = false;

        } else if(!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/u.test(userName)) {
            setUserNameError("El nombre no es válido");
            isValid = false;

        } else if (userLastName === "") {
            setUserLastNameError("El apellido es requerido");
            isValid = false;

        } else if(!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/u.test(userLastName)) {
            setUserLastNameError("El apellido no es válido");
            isValid = false;

        } else if (email === "") {
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

        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[a-zA-Z\d!@#$%^&*.]{8,}$/.test(password)) {
            setPasswordError("La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un caracter especial y un número");
            isValid = false;
        }

        return isValid;
    }

    const handleSignUp = async () => {
        if (validateInputs()) {
            await axios.post(AUTH_URL + "signup", { 
                name: userName, 
                surnames: userLastName, 
                email, 
                password
            })
            .then(function (response) {
                const user = response.data.user;
                Cookies.set("token", response.data.token);
                localStorage.setItem('user', JSON.stringify(user));
                navigate("/historyReports");
                
                props.onHide();
            })
            .catch(function (error) {
                if(error.response.status === 409) {
                    setPasswordError("El correo electrónico ya está registrado");
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
                <Modal.Title>Registro de conductor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="signUp">
                    <InputGroup>
                        <div className="nameSection">
                            <Form.Label for="name" className="inputFieldLabel">Nombre *</Form.Label>
                            <Form.Control
                                id="name"
                                placeholder="Kendrick"
                                value={userName}
                                maxLength={50}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <Form.Label className="labelError">
                                {userNameError}
                            </Form.Label>
                        </div>
                        <div className="lastNameSection">
                            <Form.Label for="name" className="inputFieldLabel">Apellido(s) *</Form.Label>
                            <Form.Control
                                id="lastName"
                                placeholder="Lamar"
                                value={userLastName}
                                maxLength={50}
                                onChange={(e) =>
                                    setUserLastName(e.target.value)
                                }
                            />
                            <Form.Label className="labelError">
                                {userLastNameError}
                            </Form.Label>
                        </div>
                    </InputGroup>
                    <div>
                        <Form.Label for="personalEmail" className="inputFieldLabel">
                            Correo electrónico *
                        </Form.Label>
                        <Form.Control
                            id="personalEmail"
                            type="email"
                            placeholder="example@safedriver.com"
                            value={email}
                            maxLength={320}
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
                            maxLength={128}
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
                    onClick={handleSignUp}
                    className="signUpButton"
                >
                    Registrarse
                </Button>{" "}
            </Modal.Footer>
        </Modal>
    );
}

export default SignUp;
