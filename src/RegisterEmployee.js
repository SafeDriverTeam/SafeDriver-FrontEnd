import { Button, Form, InputGroup } from "react-bootstrap";
import "./CSS/RegisterEmployee.css";
import React, { useState } from "react";

function RegisterEmployee() {
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="RegisterEmployeeForm">
            <h1>Registro de empleado</h1>
            <Form.Group className="mb-3">
                <Form.Label for="name">Nombre</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                        id="name"
                        placeholder="Ingrese su nombre"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </InputGroup>
                <Form.Label for="lastName">Apellido(s)</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                        id="lastName"
                        placeholder="Ingrese sus apellidos"
                        value={userLastName}
                        onChange={(e) => setUserLastName(e.target.value)}
                    />
                </InputGroup>
                <Form.Label for="empresarialEmail">Correo electrónico</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                        id="empresarialEmail"
                        placeholder="email"
                        aria-label="email"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text id="basic-addon2">
                        @safedriver.com
                    </InputGroup.Text>
                </InputGroup>
                <Form.Label for="pass">Contraseña</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                        id="pass"
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className="ShowPasswordGroup">
                    <Form.Check
                        id="check"
                        className="ShowPasswordCheck"
                        value={showPassword}
                        onChange={() => setShowPassword((prev) => !prev)}
                    />
                    <Form.Label for="check">Mostrar contraseña</Form.Label>
                </InputGroup>
                <Button variant="primary" className="RegisterEmployeeButton">Registrar empleado</Button>{" "}
            </Form.Group>
        </div>
    );
}

export default RegisterEmployee;
