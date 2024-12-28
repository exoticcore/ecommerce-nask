import { mount } from 'media/MediaApp';
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../utils/redux';

function MediaApp({ main = '' }: { main?: string }) {
  // const location = useLocation();
  const ref = useRef(null);
  // const navigate = useNavigate();

  // const user = useAppSelector((state) => state.user);

  useEffect(() => {
    mount(ref.current, main);
  }, []);

  return <div ref={ref}></div>;
}

export default MediaApp;
