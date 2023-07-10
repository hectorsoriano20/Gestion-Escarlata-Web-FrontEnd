import "./HeroServicesStyles.css";

function HeroServ (props){
    return(
        <>
            <div className={props.cName}>
            
                <div className="ServiceTest">
            
                    <a href={props.url} className = {props.btnClass}>
                        {props.buttonText}
                    </a>

                </div>

            </div>
        </>
    )
}

export default HeroServ;