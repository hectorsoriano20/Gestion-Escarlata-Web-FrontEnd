import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Imagen from "../assents/2da.jpg";
import Footer from "../components/Footer.js";
import LoginForm from "../components/LoginForm.js";


function Login (){
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
         <LoginForm />
         <Footer />
        </>
    )
}

export default Login;