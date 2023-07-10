import "../componentsStyle/HeroStyles.css";
import {Link} from "react-router-dom";

function Hero (props){
    return(
        <>
            <div className={props.cName}>
                <img alt="HerpImg" src= {props.heroImg} />

                <div className="hero-text">
                   
                    <h1> {props.title} </h1>
                    <p>{props.text}</p>
                    <a href={props.url} className={`${props.btnClass} buttonText`}>
                        {props.buttonText}
                    </a>

                </div>

            </div>
        </>
    );
}
export default Hero;
