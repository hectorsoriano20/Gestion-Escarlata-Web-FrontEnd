import React, { useContext, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"; // Importa Link
import { AuthContext } from "../context/AuthContext";
import "../componentsStyle/ContactFormStyles.css";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const { login } = useContext(AuthContext); // Usa el useContext hook para obtener la función login del AuthContext
    const navigate = useNavigate(); // Para redirigir al usuario

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get('https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/Persona');

            // Buscamos una persona que coincida con el correo y contraseña proporcionados
            const persona = response.data.body.find(persona => persona.Correo_Persona === email && persona.Contrasena_Persona === contrasena);

            if (persona) {
                login(); // Marca al usuario como autenticado
                navigate("/"); // Redirige al usuario a la ruta "/"
            } else {
                setErrorMsg('Credenciales incorrectas');
            }
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            setErrorMsg('Hubo un problema al intentar iniciar sesión');
        }
    };

    return (
        <div className="from-continer">
            <h1> Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Correo" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input placeholder="Contraseña" type="password" value={contrasena} onChange={e => setContrasena(e.target.value)} />

                <button type="submit"> Iniciar Sesión </button>
                {errorMsg && <p className="error-message">{errorMsg}</p>}
            </form>

            <p>
                ¿No tienes una cuenta? <Link to="/register">Crea una aquí</Link>
            </p>
        </div>
    );
}

export default LoginForm;
