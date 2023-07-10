import "../componentsStyle/FooterStyles.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <div className="footer">
            <div className="top">
                <div>
                    <h1>Gestión Escarlata</h1>
                    <p>Salva una vida</p>
                </div>
                <div>
                    <a href="/">
                        <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="/">
                       <i class="fa-brands fa-linkedin"></i>
                    </a>
                    <a href="/">
                        <i class="fa-brands fa-github"></i>
                    </a>
                </div>
            </div>

            <div className="bottom">
                <div>
                    <h4>Proyecto</h4>
                    <a href="/">Logs</a>
                    <a href="/">Estatus</a>
                    <a href="/">Licencia</a>
                    <a href="/">Todas las versiones</a>
                </div>
                <div>
                    <h4>Comunidad</h4>
                    <a href="/">GitHub</a>
                    <a href="/">Proyecto</a>
                    <a href="/">Twitter</a>
                </div>
                <div>
                    <h4>Ayuda</h4>
                    <Link className="Tutorial" to = "/tutorial"> Tutorial</Link>
                    <a href="/">Soporte Técnico</a>
                    <a href="/">Contactanos</a>
                    <a href="/">Aporta</a>
                </div>
                <div>
                    <h4>Creadores</h4>
                    <a href="/">Héctor</a>
                    <a href="/">Alejandro</a>
                    <a href="/">Bryan</a>
                    <a href="/">Gracias a Dios</a>
                </div>


            </div>
        </div>
    )
}

export default Footer;