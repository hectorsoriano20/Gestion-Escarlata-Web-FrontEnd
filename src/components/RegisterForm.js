import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { differenceInYears, parseISO } from 'date-fns';
import "../componentsStyle/ContactFormStyles.css";

function Dialog({ message, onClose }) {
    return (
        <div className="dialog">
            <div className="dialog-content">
                <h2>{message}</h2>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function RegisterForm() {
    const { user } = useAuth0();
    const userId = user && user.sub ? user.sub.split('|')[1] : null;
    const [dialog, setDialog] = useState(null);
    const [loading, setLoading] = useState(false);

    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [tipoSangre, setTipoSangre] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const edad = differenceInYears(new Date(), parseISO(fechaNacimiento));

    const navigate = useNavigate();

    const closeDialog = () => {
        setDialog(null);
        navigate("/profile");
    }

    const validateCedula = (cedula) => {
        const cedulaRegex = /^\d{1,11}$/;
        return cedulaRegex.test(cedula);
    }

    const validateNumero = (numero) => {
        const numeroRegex = /^\d{1,10}$/;
        return numeroRegex.test(numero);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        let userExists = false;

        if (!userId) {
            setErrorMsg('No se puede registrar el usuario sin una identificación de usuario válida');
            setLoading(false);
            return;
        }

        try {
            const getUserResponse = await axios.get(`https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/Persona/User/${userId}`);
            const putData = {
                Cedula_Persona: cedula,
                Nombre_Persona: nombre,
                Apellido_Persona: apellido,
                Correo_Persona: email,
                Numero_Persona: numero,
                FechaNacimiento_Persona: fechaNacimiento,
                Edad_Persona: edad,
                Tipo_Sangre_Persona: tipoSangre,
            };
            await axios.put(`https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/Persona/PUT/${getUserResponse.data.body.ID_Persona}`, putData);
            userExists = true;
            setDialog('Datos actualizados con éxito');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                userExists = false;
            } else {
                console.error("Error al registrar el usuario", error);
                setDialog('Hubo un problema al intentar registrar el usuario');
            }
        }

        if (!userExists) {
            try {
                const formData = {
                    Cedula_Persona: cedula,
                    Nombre_Persona: nombre,
                    Apellido_Persona: apellido,
                    Correo_Persona: email,
                    Numero_Persona: numero,
                    FechaNacimiento_Persona: fechaNacimiento,
                    Edad_Persona: edad,
                    Tipo_Sangre_Persona: tipoSangre,
                    Estado_Persona: "Inactivo",
                    User_ID_Persona: userId
                };

                await axios.post('https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/Persona/POST', formData);

                const emailData = {
                    Email_Formulario: email,
                    Nombre_Persona: nombre,
                    Apellido_Persona: apellido
                };

                await axios.post('https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/send-email', emailData);

                setDialog('Datos Actualizados');
            } catch (error) {
                console.error("Error al crear el usuario", error);
                setDialog('Hubo un problema al intentar crear el usuario');
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (loading) {
            document.body.classList.add('blur');
        } else {
            document.body.classList.remove('blur');
        }
    }, [loading]);

    return (
        <div className={`from-continer ${loading ? 'blur' : ''}`}>
            <h1> Formulario de Registro</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Cédula (Sin guiones)"
                    type="text"
                    value={cedula}
                    onChange={(e) => {
                        if (validateCedula(e.target.value)) {
                            setCedula(e.target.value);
                            setErrorMsg("");
                        } else {
                            setErrorMsg("La cédula debe contener máximo 11 números");
                        }
                    }}
                />
                <input
                    placeholder="Nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(capitalizeFirstLetter(e.target.value))}
                />
                <input
                    placeholder="Apellido"
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(capitalizeFirstLetter(e.target.value))}
                />
                <input placeholder="Correo" type="email" value={email} onChange={e => setEmail(e.target.value)} />

                <input
                    placeholder="Número de teléfono"
                    type="tel"
                    value={numero}
                    onChange={(e) => {
                        if (validateNumero(e.target.value)) {
                            setNumero(e.target.value);
                            setErrorMsg("");
                        } else {
                            setErrorMsg("El número debe contener máximo 10 números");
                        }
                    }}
                />
                <label htmlFor="labelf" className="labelf">Fecha de Nacimiento</label>
                <input placeholder="Fecha de nacimiento" type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />

                <select className="mySelect" value={tipoSangre} onChange={e => setTipoSangre(e.target.value)}>
                    <option value="">--Seleccione el tipo de sangre--</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </select>

                <button type="submit" disabled={loading}> Actualizar </button>
                {errorMsg && <p className="error-message">{errorMsg}</p>}
            </form>
            {dialog && <Dialog message={dialog} onClose={closeDialog} />}
        </div>
    );
}

export default RegisterForm;
