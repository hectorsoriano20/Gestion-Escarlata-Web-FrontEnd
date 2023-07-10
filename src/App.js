import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // Importa react-modal
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Home from "./routes/Home";
import HomeLogin from './routes/Home.Login';
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import Register from "./routes/Register";
import Maps from "./components2/Maps";
import Cita from "./routes/Cita";
import Compra from "./routes/Compra";
import Profile from "./routes/Profile";
import Tutorial from "./routes/Tutorial"
import { AuthProvider } from "./context/AuthContext";
import LoginAuth0 from "./routes/LoginAuth0";

export default function App() {

  useEffect(() => {
    Modal.setAppElement('#root'); // Configura el elemento de la aplicación para el modal
  }, []);

  return (
    <Auth0Provider
      domain="dev-ab30xjkszfyqo3b4.us.auth0.com"
      clientId="CvXjZ5aIwUZc8OvrC91Jw2c2CCwqaNco"
      redirectUri={window.location.origin}
    >
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/update" element={<HomeLogin />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginAuth0 />} />
            <Route path="/register" element={<Register />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/citas" element={<Cita />} />
            <Route path="/compras" element={<Compra />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tutorial" element={<Tutorial />} />
          </Routes>
        </div>
      </AuthProvider>
    </Auth0Provider>
  );
}
