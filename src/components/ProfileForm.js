import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from '../context/AuthContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, Link } from "react-router-dom";
import "../componentsStyle/ContactFormStyles.css";
import LogoutButton from "./Logout.Auth0.Form";
import { UserContext } from "../context/UserContext";
import axios from 'axios';

function ProfileForm() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const { user, isLoading, isAuthenticated } = useAuth0();
    const [apiData, setApiData] = useState({});
    const [pintaData, setPintaData] = useState([]);

    const handleLogout = () => {
        logout();
        localStorage.removeItem('user');
        navigate('/');
    };

    useEffect(() => {
        if (isLoading || !isAuthenticated) {
            navigate("/login");
            return;
        }

        const userId = user.sub.split('|')[1];
        const fetchData = async () => {
            try {
                const result = await axios(`https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/Persona/User/${userId}`);
                if (result.data) {
                    setApiData(result.data.body);
                    // Obtén y guarda los datos de Pinta
                    const pintaResult = await axios(`https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/Pinta/Cedula/${result.data.body.Cedula_Persona}`);
                    if (pintaResult.data) {
                        setPintaData(pintaResult.data.body);
                    }
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, [isLoading, isAuthenticated, user, navigate]);

    const userId = user && user.sub ? user.sub.split('|')[1] : null;

    return (
        <>
            <div className="card">
                <h1 className="card-title">Datos del Usuario</h1>
    
                <div className="user-info">
                    <p><span className="bold">Cédula:</span> {apiData.Cedula_Persona}</p>
                    <p><span className="bold">Nombre:</span> {apiData.Nombre_Persona}</p>
                    <p><span className="bold">Apellido:</span> {apiData.Apellido_Persona}</p>
                    <p><span className="bold">Email:</span> {apiData.Correo_Persona}</p>
                    <p><span className="bold">Fecha de Nacimiento:</span> {apiData.FechaNacimiento_Persona ? apiData.FechaNacimiento_Persona.split("T")[0] : ''}</p>
                    <p><span className="bold">Número de Contacto:</span> {apiData.Numero_Persona}</p>
                    <p><span className="bold">Tipo de Sangre:</span> {apiData.Tipo_Sangre_Persona}</p>
                </div>
    
                {pintaData.length > 0 && (
                    <>
                        <h2 className="card-title-table">Pintas Donadas</h2>
                        <div className="table-container1">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Fecha de Donación</th>
                                        <th>Banco de Sangre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pintaData.map((pinta, index) => (
                                        <tr key={index}>
                                            <td>{pinta.FechaDonacion_Pinta ? pinta.FechaDonacion_Pinta.split("T")[0] : ''}</td>
                                            <td>{pinta.Nombre_BancoSangre}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
    
                <Link className="actualizar" to="/register">Actualiza tu perfil</Link>
                <LogoutButton />
            </div>
        </>
    );

    
    
}

export default ProfileForm;
