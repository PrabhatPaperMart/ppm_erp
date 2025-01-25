import React from 'react';
import LoginPage from '../pages/LoginPage';

const ProtectedRoute = (props) => {
  const {
    children = <></>
  } = props;

  const authenticated = localStorage.getItem('authToken');

  if (!authenticated) {
    props.history.push('/login');
    return (
      <LoginPage
        history={ history }
      />
    );
  }

  return children;
};

export default ProtectedRoute;