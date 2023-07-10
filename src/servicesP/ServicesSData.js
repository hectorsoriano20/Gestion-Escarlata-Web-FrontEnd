import "../componentsStyle/SquaresStlyes.css";



function ServicesSData(props) {
    return(
        <div className="t-card">
            <div className="t-Simage">
                <img src = {props.image} alt = "images/squares"/>
            </div>
            <h4>{props.heading}</h4>
            <p>{props.text}</p>
        </div>
    )
    
}

export default ServicesSData;