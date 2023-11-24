import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function SignUp(props) {
    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userLastNameError, setUserLastNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = () => {
        setUserNameError("");
        setUserLastNameError("");
        setEmailError("");
        setPasswordError("");

        if (userName === "") {
            setUserNameError("El nombre es requerido");
            return;
        }

        if (userLastName === "") {
            setUserLastNameError("El apellido es requerido");
            return;
        }

        if (email === "") {
            setEmailError("El correo electrónico es requerido");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("El correo electrónico no es válido");
            return;
        }

        if (password === "") {
            setPasswordError("La contraseña es requerida");
            return;
        }

        if (password.length < 8) {
            setPasswordError("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        props.onHide();
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
