import React from 'react';
import { mount } from 'product/ProductApp';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../utils/redux';

function ProductApp() {
  const location = useLocation();
  const ref = useRef(null);
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(location.pathname);
    mount(ref.current, { pathname: location.pathname, navigate });
  }, [location, navigate]);

  return <div ref={ref}></div>;
}

export default ProductApp;
