import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import NavbarLogin from "../components/NavbarLogin.js";
import Imagen from "../assents/6.jpg";
import Intersting from "../components/Intersting.js";
import Squares from "../components/Squares.js";
import Footer from "../components/Footer.js";
import { useNavigate } from "react-router-dom";
import "../componentsStyle/HeroStyles.css";
import "../componentsStyle/HomeRedirectStyle.css"

function Dialog({ message, onClose }) {
    // Reemplaza los caracteres de nueva línea por elementos <br />
    const formattedMessage = message.split('\n').map((item, i) => {
      return <p key={i}>{item}</p>;
    });
  
    return (
      <div className="dialog">
        <div className="dialog-content">
          {formattedMessage}
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  }
  

function HomeLogin (){
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [dialog, setDialog] = useState(null);

    const closeDialog = () => {
        setDialog(null);
        navigate("/profile");
    }

    useEffect(() => {
        setDialog("Bienvenid@,\nFavor confirmar si su información está actualizada.");
    }, []);
    

    return(
        <>
         {isAuthenticated ? <NavbarLogin /> : <Navbar />}
         <Hero 
         cName = "hero"
         heroImg = {Imagen}
         title = "Salva una vida"
         text = "No pierdas más tiempo"
         buttonText = "DONA YA!"
         url = "/citas"
         btnClass = "show"
         /> 
         <Intersting />
         <Squares />
         <Footer />
         {dialog && <Dialog message={dialog} onClose={closeDialog} />}
        </>
    );
}
export default HomeLogin;
