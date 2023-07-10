import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Imagen from "../assents/2da.jpg";
import Footer from "../components/Footer.js";
import LoginButtom from "../components/Login.Auth0.Form.js";


function LoginAuth0 (){
    return(
        <>
         <Navbar />
         <Hero 
         cName = "hero-mid"
         heroImg = {Imagen}
        //  title = "Contáctanos"
        //  text = "Podemos ayudarte"
         btnClass = "hide"
         />
         <LoginButtom />
         <Footer />
        </>
    )
}

export default LoginAuth0;