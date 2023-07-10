import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const LoginButtonWrapper = ({ url, className, children }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Link 
      className={className} 
      to={url} 
      onClick={(e) => {
        e.preventDefault();
        loginWithRedirect({ redirectUri: 'https://gestionescarlata.online/update' });
      }}
    >
      {children}
    </Link>
  );
}

export default LoginButtonWrapper;
