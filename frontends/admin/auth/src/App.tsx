import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';

import SignIn from './components/SignIn';
import Reset from './components/Reset';

import 'container/index.scss';
import { useAppDispatch, useAppSelector } from './utils/redux';

import { getUserInfo } from 'store/Store';

function App({ history }: { history?: string }): React.ReactNode {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {}, []);

  return (
    <Routes>
      <Route path="/auth/signin" element={<SignIn />} />
      {/* <Route path="/auth/reset" element={<Reset />} /> */}
    </Routes>
  );
}

export default App;
