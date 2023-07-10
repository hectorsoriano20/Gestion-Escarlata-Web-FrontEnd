import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import "../componentsStyle/ContactFormStyles.css";

function LoginButtom() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="from-continer1">
        <button className='login1' onClick={() => loginWithRedirect({redirectUri: 'https://gestionescarlata.online/update'})}>
        ABRIR PANTALLA INICIO DE SESION
        </button>
    </div>
  );
}

export default LoginButtom;
