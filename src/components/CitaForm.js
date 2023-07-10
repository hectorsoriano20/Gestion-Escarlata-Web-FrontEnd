import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
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
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function CitaForm() {
  const cedulaRef = useRef(null);
  const nombreRef = useRef(null);
  const emailRef = useRef(null);
  const tipoSangreRef = useRef(null);
  const fechaCitaRef = useRef(null);
  const horaCitaRef = useRef(null);

  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [tipoSangre, setTipoSangre] = useState("");
  const [fechaCita, setFechaCita] = useState("");
  const [horaCita, setHoraCita] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [dialog, setDialog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate(); 

  const closeDialog = () => {
    setDialog(null);
    navigate("/service");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar campos vacíos
    const emptyFields = [];
    if (!cedula) emptyFields.push({ field: "Cédula", ref: cedulaRef });
    if (!nombre) emptyFields.push({ field: "Nombre", ref: nombreRef });
    if (!email) emptyFields.push({ field: "Correo", ref: emailRef });
    if (!tipoSangre) emptyFields.push({ field: "Tipo de sangre", ref: tipoSangreRef });
    if (!fechaCita) emptyFields.push({ field: "Fecha de la cita", ref: fechaCitaRef });
    if (!horaCita) emptyFields.push({ field: "Hora de la cita", ref: horaCitaRef });

    if (emptyFields.length > 0) {
      setErrorMsg(`Por favor, complete los siguientes campos: ${emptyFields.map(field => field.field).join(", ")}`);
      emptyFields[0].ref.current.focus();
      setFormSubmitted(true);
      return;
    }

    // Validar fecha de cita no anterior al día actual
    const today = new Date().toISOString().split("T")[0];
    if (fechaCita < today) {
      setErrorMsg("La fecha de la cita no puede ser anterior al día de hoy.");
      fechaCitaRef.current.focus();
      return;
    }

    setLoading(true);

    try {
      const formData = {
        Cedula_Cita: cedula,
        Nombre_Cita: nombre,
        Correo: email,
        Tipo_Sangre_Cita: tipoSangre,
        Fecha_Cita: fechaCita,
        Hora_Cita: horaCita,
        Estado_Cita: ""
      };

      await axios.post('https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/Cita/POST', formData);

      // Datos para la segunda petición POST
      const emailData = {
        Correo: email,
        Nombre_Cita: nombre,
      };

      // Segunda petición POST
      await axios.post('https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/send-cita-email', emailData);

      setDialog('Solicitud de Cita enviada con éxito');
    } catch (error) {
      console.error("Error al registrar la cita", error);
      setDialog('Hubo un problema al intentar registrar la cita');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      document.body.classList.add('blur');
    } else {
      document.body.classList.remove('blur');
    }
  }, [loading]);

  return(
    <div className={`from-continer ${loading ? 'blur' : ''}`}>
      <h1> Formulario de Solicitud de Donación</h1> 
      <form onSubmit={handleSubmit}>
        <input
          ref={cedulaRef}
          className={`${formSubmitted && !cedula ? "empty-input" : ""}`}
          placeholder="Cédula (Sin guiones)"
          type="text"
          value={cedula}
          onChange={e => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 11) {
              setCedula(value);
            }
          }}
          maxLength={11}
        />
        <input
          ref={nombreRef}
          className={`${formSubmitted && !nombre ? "empty-input" : ""}`}
          placeholder="Nombre y Apellido"
          type="text"
          value={nombre}
          onChange={e => setNombre(capitalizeFirstLetter(e.target.value))}
        />
        <input
          ref={emailRef}
          className={`${formSubmitted && !email ? "empty-input" : ""}`}
          placeholder="Correo"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        
        <select
          ref={tipoSangreRef}
          className={`${formSubmitted && !tipoSangre ? "empty-input" : ""}`}
          value={tipoSangre}
          onChange={e => setTipoSangre(e.target.value)}
        >
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
<br></br>
        <label htmlFor="labelf" className="labelf">Fecha de la Cita</label>
        <input
          ref={fechaCitaRef}
          className={`${formSubmitted && (!fechaCita || fechaCita < new Date().toISOString().split("T")[0]) ? "empty-input" : ""}`}
          placeholder="Fecha de la cita"
          type="date"
          value={fechaCita}
          onChange={e => setFechaCita(e.target.value)}
        />
        <label htmlFor="labelf" className="labelf">Hora de la Cita</label>
        <input
          ref={horaCitaRef}
          className={`${formSubmitted && !horaCita ? "empty-input" : ""}`}
          placeholder="Hora de la cita"
          type="time"
          value={horaCita}
          onChange={e => setHoraCita(e.target.value)}
        />

        <button type="submit" onClick={() => setFormSubmitted(true)}> Enviar </button>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
      </form>
      {dialog && <Dialog message={dialog} onClose={closeDialog} />}
    </div>
  );
}

export default CitaForm;
