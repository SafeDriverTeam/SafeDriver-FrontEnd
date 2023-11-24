import { Button, Form, InputGroup } from "react-bootstrap";
import "./css/App.css";
import React, { useState } from "react";
import NavBarAdmin from "./components/NavBarAdmin";

function RegisterEmployee() {
    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userLastNameError, setUserLastNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <NavBarAdmin />
            <div className="registerEmployeeForm">
                <h1 className="titlePage">Registro de empleado</h1>
                <Form.Group>
                    <div className="flexInputField">
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
                    </div>
                    <div className="inputField">
                        <Form.Label for="empresarialEmail" className="inputFieldLabel">
                            Correo electrónico *
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                id="empresarialEmail"
                                placeholder="example"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputGroup.Text id="basic-addon2">
                                @safedriver.com
                            </InputGroup.Text>
                        </InputGroup>
                        <Form.Label className="labelError">
                            {emailError}
                        </Form.Label>
                    </div>
                    <div className="inputField">
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
                    <Button variant="primary" className="primaryButton">
                        Registrar empleado
                    </Button>{" "}
                </Form.Group>
            </div>
        </div>
    );
}

export default RegisterEmployee;
