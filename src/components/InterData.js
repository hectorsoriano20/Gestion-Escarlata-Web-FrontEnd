import "../componentsStyle/InterstingStyle.css"
import { Component } from "react"

class InterData extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <div className="des-text">
                    <h2>{this.props.heading}</h2>
                    <p>{this.props.text}</p>
                </div>
            
                <div className="image">
                    <img alt="img" src={this.props.imag1}/>
                    <img alt="img" src={this.props.imag2}/>
                </div>
            </div> 
        )
    }

}

export default InterData;
