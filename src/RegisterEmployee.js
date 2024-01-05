import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./css/App.css";
import React, { useState } from "react";
import NavBarAdmin from "./components/NavBarAdmin";
import axios from "./api/axios";
import Cookies from 'js-cookie';
const AUTH_URL = "auth/";

function RegisterEmployee() {
    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userLastNameError, setUserLastNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [type, setType] = useState("adjuster");
    const [typeError, setTypeError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [variant, setVariant] = useState("");

    function validateInputs() {
        setUserNameError("");
        setUserLastNameError("");
        setTypeError("");
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

        } else if (type === "") {
            setTypeError("El tipo de usuario es requerido");
            isValid = false;

        } else if (email === "") {
            setEmailError("El correo electrónico es requerido");
            isValid = false;

        } else if (!/^[a-zA-Z]+$/.test(email)) {
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

    const handleRegisterEmployee = async () => {
        if (validateInputs()) {
            await axios.post(AUTH_URL + "registerEmployee", { 
                name: userName, 
                surnames: userLastName, 
                email: email + "@safedriver.com", 
                password, 
                type
            }, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get("token")
                }
            })
            .then(function (response) {
                setUserName("");
                setUserLastName("");
                setType("adjuster");
                setEmail("");
                setPassword("");

                setVariant("success");
                setAlertMessage("¡Empleado registrado exitosamente!");                
                setVisibleAlert(true);
                setTimeout(() => {
                    setVisibleAlert(false);
                }, 5000);
            })
            .catch(function (error) {
                if(error.response.status === 409) {
                    setVariant("danger");
                    setAlertMessage("El correo electrónico ya está ocupado");
                } else {
                    setVariant("danger");
                    setAlertMessage("Ha ocurrido un error, inténtelo de nuevo más tarde");
                }
                setVisibleAlert(true);
                setTimeout(() => {
                    setVisibleAlert(false);
                }, 5000);
            });
        }
    };

    return (
        <div>
            <NavBarAdmin />
            <Alert show={visibleAlert} variant={variant}>
                {alertMessage}
            </Alert>
            <div className="cardStyle">
                <h1 className="titlePage">Registro de empleado</h1>
                <Form.Group>
                    <div className="flexInputField">
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
                    </div>
                    <div className="inputField">
                        <Form.Label for="type" className="inputFieldLabel">Tipo de usuario: *</Form.Label>
                        <Form.Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="adjuster">Ajustador</option>
                            <option value="executive">Ejecutivo</option>
                        </Form.Select>
                        <Form.Label className="labelError">
                            {typeError}
                        </Form.Label>
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
                                maxLength={64}
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
                            maxLength={128}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Label className="labelError">
                            {passwordError}
                        </Form.Label>
                    </div>
                    <Button 
                        variant="primary" 
                        onClick={handleRegisterEmployee}
                        className="primaryButton">
                        Registrar empleado
                    </Button>{" "}
                </Form.Group>
            </div>
        </div>
    );
}

export default RegisterEmployee;
