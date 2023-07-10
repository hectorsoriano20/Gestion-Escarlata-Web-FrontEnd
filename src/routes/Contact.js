import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import NavbarLogin from '../components/NavbarLogin';
import Imagen from "../assents/2da.jpg";
import Footer from "../components/Footer.js";
import ContactForm from "../components/ContactForm.js";


function Contact (){
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <>
         {isAuthenticated ? <NavbarLogin /> : <Navbar />}
         <Hero 
         cName = "hero-mid"
         heroImg = {Imagen}
         title = "Contáctanos"
         text = "Podemos ayudarte"
         btnClass = "hide"
         />
         <ContactForm />
         <Footer />
        </>
    )
}

export default Contact;