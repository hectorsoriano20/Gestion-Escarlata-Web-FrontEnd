import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import NavbarLogin from '../components/NavbarLogin';
import Imagen from "../assents/2da.jpg";
import Footer from "../components/Footer.js";
import RegisterForm from "../components/RegisterForm.js";


function Register (){
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <>
         {isAuthenticated ? <NavbarLogin /> : <Navbar />}
         <Hero 
         cName = "hero-mid"
         heroImg = {Imagen}
         btnClass = "hide"
         />
         <RegisterForm />
         <Footer />
        </>
    )
}

export default Register;