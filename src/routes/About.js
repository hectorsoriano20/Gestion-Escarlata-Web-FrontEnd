import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import NavbarLogin from "../components/NavbarLogin.js";
import Imagen from "../assents/7.jpg";
import Footer from "../components/Footer.js";
import AboutUs from "../components/AboutUs.js";

function About (){
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <>
        {isAuthenticated ? <NavbarLogin /> : <Navbar />}
         <Hero 
         cName = "hero-mid"
         heroImg = {Imagen}
         title = "NOSOTROS"
         btnClass = "hide"
         />
        <AboutUs />
        <Footer />
        </>
    )
}

export default About;
