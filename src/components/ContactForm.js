import React, { useState, useEffect } from "react";
import axios from 'axios';
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

function ContactForm() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [dialog, setDialog] = useState(null);
  const [loading, setLoading] = useState(false); // Nuevo estado para controlar el envío del formulario

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre || !email || !asunto || !mensaje) {
      setDialog('Por favor, completa todos los campos');
      return;
    }

    setLoading(true); // Set loading to true when submit is clicked

    const formData = {
      Email_Formulario: email,
      Nombre_Persona: nombre,
      Asunto_Formulario: asunto,
      Mensaje_Formulario: mensaje
    };

    try {
      await axios.post('https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/send-contacto-email', formData);
      setDialog('Mensaje enviado exitosamente');
    } catch (error) {
      console.error("Error al enviar el mensaje", error);
      setDialog('Hubo un problema al enviar tu mensaje');
    } finally {
      setLoading(false); // Set loading to false when a response is received
    }
  };

  const closeDialog = () => {
    setDialog(null);
    window.location.reload();
  }

  // Agregar una clase al cuerpo de la página cuando el estado 'loading' es true
  useEffect(() => {
    if (loading) {
      document.body.classList.add('blur');
    } else {
      document.body.classList.remove('blur');
    }
  }, [loading]);

  return (
    <div className={`from-continer ${loading ? 'blur' : ''}`}>
      <h1> !!Envíanos un mensaje!!</h1> 
      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(capitalizeFirstLetter(e.target.value))}/>
        <input placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)}/>
        <input placeholder="Asunto" value={asunto} onChange={e => setAsunto(e.target.value)}/>
        <textarea placeholder="Mensaje" rows="4" value={mensaje} onChange={e => setMensaje(e.target.value)}></textarea>
        <button type="submit" disabled={loading}> Enviar </button>
      </form>
      
      {dialog && <Dialog message={dialog} onClose={closeDialog} />}
    </div>
  );
}

export default ContactForm;
