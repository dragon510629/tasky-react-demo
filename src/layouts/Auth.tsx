import React from 'react';
import { Route } from 'react-router-dom';


const LoginLayout = ({ children } : any) => (
  <div>
    {children}
  </div>
);

const Auth = ({component: Component, ...rest} : any) => {
  return (
    <Route {...rest} render={matchProps => (
      <LoginLayout>
        <Component {...matchProps} />
      </LoginLayout>
    )} />
  );
}

export default Auth;
