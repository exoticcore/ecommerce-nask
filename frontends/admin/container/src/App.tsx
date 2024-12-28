import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

const AuthLazy = React.lazy(() => import('./components/AuthApp'));
const DashboardLazy = React.lazy(() => import('./components/Dashboard'));
const HeaderLazy = React.lazy(() => import('./components/Header'));
const ProductLazy = React.lazy(() => import('./components/ProductApp'));
const MediaLazy = React.lazy(() => import('./components/MediaApp'));

import './index.scss';
import axios from 'axios';
import Template from './components/Template';
import { useAppDispatch, useAppSelector } from './utils/redux';
import { getAccessToken, getUserInfo, clearAddProduct } from 'store/Store';

const App = (): React.ReactNode => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    async function getAccess() {
      dispatch(getUserInfo());
      // console.log(user);
      // console.log(user.user.isSignedIn);
      // if (!user.accessToken || user.accessToken === '') {
      //   navigate('/auth/signin');
      // }

      // if (!user.user.isSignedIn) {
      //   navigate('/auth/signin');
      // }

      // navigate('/auth/signin');

      // try {
      //   const resp = await axios.get(
      //     'http://localhost:3000/api/v1/auth/token',
      //     {
      //       withCredentials: true,
      //       headers: { 'Content-Type': 'application/json' },
      //     }
      //   );
      //   const token = resp.data.access_token;
      //   if (!token) {
      //     navigate('/auth/signin');
      //   }
      // } catch (err) {
      //   navigate('/auth/signin');
      // }
    }
    getAccess();
    if (!user.user.isSignedIn) {
      navigate('/auth/signin');
    } else {
      setIsLogin(true);
      if (user.navigate) {
        navigate(user.navigate);
      }
    }
  }, [user.user.isSignedIn, user.navigate]);

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthLazy />} />
      {isLogin ? (
        <>
          <Route
            path="/"
            element={
              <Template>
                <DashboardLazy />
              </Template>
            }
          />
          <Route
            path="/catalog/*"
            element={
              <Template>
                <ProductLazy />
              </Template>
            }
          />
          <Route
            path="/media/*"
            element={
              <Template>
                <MediaLazy />
              </Template>
            }
          />
        </>
      ) : (
        ''
      )}
    </Routes>
  );
};

const mainSwitch = [
  {
    title: '',
    icon: '',
    component: <DashboardLazy />,
  },
];

export default App;
