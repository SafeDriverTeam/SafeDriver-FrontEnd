import "./CSS/SignUp.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function SignUp(props) {
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Registro de conductor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="SignUp">
                    <Form.Label for="name" className="Label">Nombre</Form.Label>
                    <Form.Control
                        id="name"
                        placeholder="Kendrick"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <Form.Label for="name" className="Label">Apellido(s)</Form.Label>
                    <Form.Control
                        id="lastName"
                        placeholder="Lamar"
                        value={userLastName}
                        onChange={(e) => setUserLastName(e.target.value)}
                    />
                    <Form.Label for="personalEmail" className="Label">
                        Correo electrónico
                    </Form.Label>
                    <Form.Control
                        id="personalEmail"
                        type="email"
                        placeholder="example@safedriver.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Form.Label for="pass" className="Label">Contraseña</Form.Label>
                    <Form.Control
                        id="pass"
                        type={showPassword ? "text" : "password"}
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputGroup className="ShowPasswordGroup">
                        <Form.Check
                            id="check"
                            className="ShowPasswordCheck"
                            value={showPassword}
                            onChange={() => setShowPassword((prev) => !prev)}
                        />
                        <Form.Label for="check" className="LabelInfo">Mostrar contraseña</Form.Label>
                    </InputGroup>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={props.onHide}
                    className="SignUpButton"
                >
                    Registrarse
                </Button>{" "}
            </Modal.Footer>
        </Modal>
    );
}

export default SignUp;
