import React, { Component } from "react";
import "../componentsStyle/NavbarStyles.css";
import { Link } from "react-router-dom";
import LoginButtonWrapper from './LoginButtonWrapper';  // Asegúrate de que la ruta es correcta
import { MenuItems } from "./MenuItems";

class Navbar extends Component {
    state = { clicked: false };

    handclicked = () => {
        this.setState({ clicked: !this.state.clicked });
    }

    render() {
        return (
            <nav className="NavbarItems">
                <h1 className="navbar-logo">Gestión Escarlata</h1>
                <div className="menu-icons" onClick={this.handclicked}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>    
                </div>

                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    {MenuItems.map((item, index) => {
                        if (item.title === 'Acceder') {
                            return (
                                <li key={index}>
                                    <LoginButtonWrapper className={item.cNmae} url={item.url}>
                                        <i className={item.icon}></i>{item.title}
                                    </LoginButtonWrapper>
                                </li>
                            );
                        } else {
                            return (
                                <li key={index}>
                                    <Link className={item.cNmae} to={item.url}>
                                        <i className={item.icon}></i>{item.title}
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
            </nav>
        );
    }
}

export default Navbar;
