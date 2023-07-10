import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from "../components/Navbar.js";
import NavbarLogin from '../components/NavbarLogin';
import APIMaps from "../components/maps/APIMaps.jsx";

function Maps (){
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <div className="maps">
         {isAuthenticated ? <NavbarLogin /> : <Navbar />}
         <APIMaps />
        </div>
    )
}

export default Maps;