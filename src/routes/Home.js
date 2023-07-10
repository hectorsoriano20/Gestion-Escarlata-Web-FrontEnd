import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import NavbarLogin from "../components/NavbarLogin.js";
import Imagen from "../assents/6.jpg";
import Intersting from "../components/Intersting.js";
import Squares from "../components/Squares.js";
import Footer from "../components/Footer.js";
import "../componentsStyle/HeroStyles.css";

function Home (){
    const { isAuthenticated } = useContext(AuthContext);

    return(
        <>
         {isAuthenticated ? <NavbarLogin /> : <Navbar />}
         <Hero 
         cName = "hero"
         heroImg = {Imagen}
         title = "SALVA UNA VIDA"
         text = "NO PIERDAS MÁS TIEMPO"
         buttonText = "DONA YA!"
         url = "/citas"
         btnClass = "show buttonText"
         /> 
         <Intersting />
         <Squares />
         <Footer />
        </>
    );
}
export default Home;
