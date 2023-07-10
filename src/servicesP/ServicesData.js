import { Link } from "react-router-dom";
import "./ServicesSDS.css";
import ServicesSData from "./ServicesSData.js";
import card1 from "../assents/DonarSangre.jpg"
import card2 from "../assents/PintadeSangre.jpg"
import card3 from "../assents/GoogleMaps.jpg"
import HeroService from "../DirServices/HeroServices.js"

function ServicesData() {
    return (
        <div className="circle">
            <h1>Servicios disponibles</h1>
            <p1>Nos enfocamos en ofrecerte el mejor trato.</p1>
            <div className="circlecard">
                <ServicesSData
                    image={card1}
                    heading="Donar Pinta de Sangre"
                    text={
                        <>
                            Como usuario, tienes la posibilidad de agendar una cita para donar pintas de sangre de la manera más rapida y segura.  
                            <HeroService 
                                buttonText = "Donar"
                                url = "/citas"
                                btnClass = "DonarTest"
                            />
                        </>
                    }
                />
                
                <ServicesSData
                    image={card2}
                    heading="Solicitar Pinta de Sangre"
                    text={
                        <>
                            Si necesitas una pinta de sangre, no dudes en solicitarla, llena el formulario y nos pondremos en contacto contigo.  
                            <HeroService 
                                buttonText = "Solicitar"
                                url = "/compras"
                                btnClass = "DonarTest"
                            />
                        </>
                    }
                />

                <ServicesSData
                    image={card3}
                    heading="Vizualizar Bancos de Sangre más cercanos"
                    text={
                        <>
                            Única plataforma que te permite vizualisar los bancos de sangre más cercanos a tu ubicación junto con sus detalles.  
                            <HeroService 
                                buttonText = "Bancos de Sangre"
                                url = "/maps"
                                btnClass = "DonarTest"
                            />                        </>
                    }
                />
                
            </div>
        </div>
    )
}

export default ServicesData;
