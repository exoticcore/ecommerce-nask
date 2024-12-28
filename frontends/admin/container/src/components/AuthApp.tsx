import React from 'react';
import { mount } from 'auth/AuthApp';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../utils/redux';
import { useNavigate } from 'react-router-dom';

function AuthApp() {
  const location = useLocation();
  const ref = useRef(null);
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    mount(ref.current, { pathname: location.pathname });
    if (user.navigate && user.user.isSignedIn) {
      navigate(user.navigate);
    }
  }),
    [user];

  return <div ref={ref}></div>;
}

export default AuthApp;
