import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import NavbarLogin from "../components/NavbarLogin.js";
import Imagen from "../assents/7.jpg";
import Footer from "../components/Footer.js";
import AboutUs from "../components/AboutUs.js";
import ReactPlayer from "../Tutorial/Video.js"


function Tutorial (){
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <>
        {isAuthenticated ? <NavbarLogin /> : <Navbar />}
        <div className="Back">
            <h1 className='Th1'>
                Tutorial
            </h1>
            <ReactPlayer />  
        </div>
        <Footer />
        </>
    )
}

export default Tutorial;