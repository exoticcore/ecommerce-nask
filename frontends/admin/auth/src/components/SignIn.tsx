import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, redirect } from 'react-router-dom';
import Background from '../commons/Background';
import * as theme from 'container/Styles';
import FormCard from '../commons/FormCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector, useAppDispatch } from '../utils/redux';
import { login, setNavigate } from 'store/Store';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const emailIconRef = useRef<SVGSVGElement>(null);
  const pwdIconRef = useRef<SVGSVGElement>(null);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const pwdInputRef = useRef<HTMLInputElement>(null);

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      if (pwdInputRef.current) {
        pwdInputRef.current.focus();
      } else {
        return;
      }
    }

    if (!password && pwdInputRef.current) {
      console.log({ greenDark: theme.greenDark });
      return pwdInputRef.current.focus();
    }

    if (!email || !password) return;

    dispatch(login({ email, password }));

    if (user.error === null && user.user.isSignedIn) {
      dispatch(setNavigate('/'));
    }
  };

  const handleFocus = (ref: React.RefObject<SVGSVGElement>) => {
    if (ref.current) {
      return ref.current.classList.add('--active');
    }
  };

  const handleOutFocus = (ref: React.RefObject<SVGSVGElement>) => {
    if (ref.current) {
      return ref.current.classList.remove('--active');
    }
  };

  useEffect(() => {
    if (user.user.isSignedIn) {
      dispatch(setNavigate('/'));
    }
  }, []);

  return (
    <Background>
      <FormCard>
        <div className="topic">ADMIN</div>
        <form onSubmit={submitLogin} method="POST">
          <div className="input-icon">
            <FontAwesomeIcon
              icon={faUser}
              className="icon"
              ref={emailIconRef}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              ref={emailInputRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => handleFocus(emailIconRef)}
              onBlur={() => handleOutFocus(emailIconRef)}
            />
          </div>
          <div className="input-icon">
            <FontAwesomeIcon icon={faKey} className="icon" ref={pwdIconRef} />
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              name="password"
              ref={pwdInputRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => handleFocus(pwdIconRef)}
              onBlur={() => handleOutFocus(pwdIconRef)}
            />
          </div>
          {/* <Link to="/auth/reset">Forgot Password?</Link> */}
          <input type="submit" value="LOGIN" className="button-long" />
          {error ? `` : null}
        </form>
      </FormCard>
    </Background>
  );
}

export default SignIn;
