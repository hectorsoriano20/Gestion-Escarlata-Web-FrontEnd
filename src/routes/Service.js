import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import NavbarLogin from '../components/NavbarLogin';
import Imagen from "../assents/5.jpg";
import Footer from "../components/Footer.js";
import Squares from "../components/Squares.js";
import ServicesData from "../servicesP/ServicesData.js";


function Service (){
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <>
         {isAuthenticated ? <NavbarLogin /> : <Navbar />}
         <Hero 
         cName = "hero-mid"
         heroImg = {Imagen}
         title = "Da el primer paso"
         btnClass = "hide"
         />
         <ServicesData />
         <Footer />
        </>
    )
}

export default Service;