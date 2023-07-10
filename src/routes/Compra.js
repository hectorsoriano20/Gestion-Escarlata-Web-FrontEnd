import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import NavbarLogin from '../components/NavbarLogin';
import Imagen from "../assents/2da.jpg";
import Footer from "../components/Footer.js";
import CompraForm from "../components/CompraForm.js";


function Compra (){
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <>
         {isAuthenticated ? <NavbarLogin /> : <Navbar />}
         <Hero 
         cName = "hero-mid"
         heroImg = {Imagen}
        //  title = "Contáctanos"
        //  text = "Podemos ayudarte"
         btnClass = "hide"
         />
         <CompraForm />
         <Footer />
        </>
    )
}

export default Compra;