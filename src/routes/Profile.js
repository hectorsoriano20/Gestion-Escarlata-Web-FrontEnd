import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import NavbarLogin from "../components/NavbarLogin.js";
import Imagen from "../assents/2da.jpg";
import Footer from "../components/Footer.js";
import ProfileForm from "../components/ProfileForm.js";


function Profile (){
    return(
        <>
         <NavbarLogin />
         <Hero 
         cName = "hero-mid"
         heroImg = {Imagen}
        //  title = "Contáctanos"
        //  text = "Podemos ayudarte"
         btnClass = "hide"
         />
         <ProfileForm/>
         <Footer />
        </>
    )
}

export default Profile;