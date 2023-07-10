import "../componentsStyle/SquaresStlyes.css";
import Squares from "./Squares";


function SquaresData(props) {
    return(
        <div className="t-card">
            <div className="t-image">
                <img src = {props.image} alt = "images/squares"/>
            </div>
            <h4>{props.heading}</h4>
            <p>{props.text}</p>
        </div>
    )
    
}

export default SquaresData;