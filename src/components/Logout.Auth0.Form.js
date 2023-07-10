import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../componentsStyle/ContactFormStyles.css";

function LogoutButton() {
  const { logout } = useAuth0();

  return (
        <button className="logout1" onClick={() => logout()}>
          Cerrar sesión
        </button>
  );
}

export default LogoutButton;

