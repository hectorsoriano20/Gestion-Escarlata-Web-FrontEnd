import React, { useState, useEffect } from "react";
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

function CompraForm() {
  const [cedulaComprador, setCedulaComprador] = useState("");
  const [nombreComprador, setNombreComprador] = useState("");
  const [correoCompra, setCorreoCompra] = useState("");
  const [telefonoCompra, setTelefonoCompra] = useState("");
  const [grupoSanguineoCompra, setGrupoSanguineoCompra] = useState("");
  const [cedulaDonante, setCedulaDonante] = useState("");
  const [nombreDonante, setNombreDonante] = useState("");
  const [grupoSanguineoDonante, setGrupoSanguineoDonante] = useState("");
  const [edadDonante, setEdadDonante] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [dialog, setDialog] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const closeDialog = () => {
    setDialog(null);
    navigate("/service");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar campos obligatorios
    const requiredFields = [
      { value: cedulaComprador, name: "Cédula del Comprador" },
      { value: nombreComprador, name: "Nombre del Comprador" },
      { value: correoCompra, name: "Correo de la Compra" },
      { value: telefonoCompra, name: "Teléfono de la Compra" },
      { value: grupoSanguineoCompra, name: "Grupo Sanguíneo del Comprador" },
      { value: cedulaDonante, name: "Cédula del Donante" },
      { value: nombreDonante, name: "Nombre del Donante" },
      { value: grupoSanguineoDonante, name: "Grupo Sanguíneo del Donante" },
      { value: edadDonante, name: "Edad del Donante" }
    ];

    const emptyFields = requiredFields.filter(field => !field.value);
    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map(field => field.name);
      setErrorMsg(`Por favor, complete los siguientes campos: ${fieldNames.join(", ")}`);
      return;
    }

    setLoading(true);

    try {
      const formData = {
        Cedula_Comprador: cedulaComprador,
        Nombre_Comprador: nombreComprador,
        Correo_Compra: correoCompra,
        Telefono_Compra: telefonoCompra,
        Grupo_Sanguineo_Compra: grupoSanguineoCompra,
        Cedula_Donante: cedulaDonante,
        Nombre_Donante: nombreDonante,
        Grupo_Sanguineo_Donante: grupoSanguineoDonante,
        Edad_Donante: edadDonante,
        Estatus_Compra: ""
      };

      await axios.post(
        "https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/CompraSangre/POST",
        formData
      );

      // Datos para la segunda petición POST
      const emailData = {
        Correo_Compra: correoCompra,
        Nombre_Comprador: nombreComprador
      };

      // Segunda petición POST
      await axios.post(
        "https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/send-compra-email",
        emailData
      );

      setDialog("Solicitud de Compra registrada con éxito");
    } catch (error) {
      console.error("Error al registrar la compra", error);
      setDialog("Hubo un problema al intentar registrar la compra");
    } finally {
      setLoading(false);
    }
  };

  const handleCedulaCompradorChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,11}$/.test(value)) {
      setCedulaComprador(value);
    }
  };

  const handleCedulaDonanteChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,11}$/.test(value)) {
      setCedulaDonante(value);
    }
  };

  const handleNombreCompradorChange = (event) => {
    const value = event.target.value;
    setNombreComprador(capitalizeFirstLetter(value));
  };

  const handleNombreDonanteChange = (event) => {
    const value = event.target.value;
    setNombreDonante(capitalizeFirstLetter(value));
  };

  const handleTelefonoCompraChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setTelefonoCompra(value);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (loading) {
      document.body.classList.add("blur");
    } else {
      document.body.classList.remove("blur");
    }
  }, [loading]);

  return (
    <div className={`from-continer ${loading ? "blur" : ""}`}>
      <h1>Formulario de Solicitud de Compra de Pinta de Sangre</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Cédula del Comprador"
          type="text"
          value={cedulaComprador}
          onChange={handleCedulaCompradorChange}
          maxLength={11}
        />
        <input
          placeholder="Nombre y Apellido del Comprador"
          type="text"
          value={nombreComprador}
          onChange={handleNombreCompradorChange}
        />
        <input
          placeholder="Correo de la Compra"
          type="email"
          value={correoCompra}
          onChange={(e) => setCorreoCompra(e.target.value)}
        />
        <input
          placeholder="Telefono de la Compra"
          type="tel"
          value={telefonoCompra}
          onChange={handleTelefonoCompraChange}
          maxLength={10}
        />
        <select
          className="mySelect"
          value={grupoSanguineoCompra}
          onChange={(e) => setGrupoSanguineoCompra(e.target.value)}
        >
          <option value="">--Seleccione el grupo sanguíneo a solicitar--</option>
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
        <br></br>
        <h2>Donante</h2>
        <br></br>
        <input
          placeholder="Cédula del Donante"
          type="text"
          value={cedulaDonante}
          onChange={handleCedulaDonanteChange}
          maxLength={11}
        />
        <input
          placeholder="Nombre y Apellido del Donante"
          type="text"
          value={nombreDonante}
          onChange={handleNombreDonanteChange}
        />

        <select
          className="mySelect"
          value={grupoSanguineoDonante}
          onChange={(e) => setGrupoSanguineoDonante(e.target.value)}
        >
          <option value="">--Seleccione el grupo sanguíneo del donante--</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <input
          placeholder="Edad del Donante"
          type="number"
          value={edadDonante}
          onChange={(e) => setEdadDonante(e.target.value)}
        />
        <button type="submit"> Enviar </button>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
      </form>
      {dialog && <Dialog message={dialog} onClose={closeDialog} />}
    </div>
  );
}

export default CompraForm;
