'use client';

import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineEmail } from 'react-icons/md';

import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setActived } from '@/redux/features/loginSignup/loginSignUpSlice';
import axios from 'axios';
import { IActiveEmail } from '../../interface/active.interface';
import ActiveEmail from './ActiveEmail';
import { useTranslations } from 'next-intl';
import { AUTH_API } from '../../constant/config';

export default function LoginSignup() {
  const [email, setEmail] = useState<string>('');
  const [sendEmail, setSendEmail] = useState<IActiveEmail | undefined>();
  const [isActive, setIsActive] = useState<boolean>(true);
  const [load, setLoad] = useState<boolean>(false);
  const t = useTranslations('Login');

  const login = useAppSelector((state) => state.loginSignUp);
  const dispatch = useAppDispatch();

  let isActiveEmail!: IActiveEmail;

  const activeEmail = async () => {
    // setLoad(true);
    // const resp = await axios.post(
    //   'http://localhost:3000/api/v1/auth/active-email',
    //   {
    //     email,
    //   }
    // );
    // setLoad(false);
    // if (resp.status === 201) {
    //   setSendEmail(resp.data);
    // }
  };

  const googleLogin = () => {
    window.open(`${AUTH_API}/google`, 'google-login', 'width=600,height=700');

    window.addEventListener('message', (e) => {
      if (e.origin !== AUTH_API) return;
      if (e.data === 'success') {
        alert('Login success');
      }
    });
  };

  return (
    <LoginSignupWrapper>
      <div
        className="absolute w-full h-full -z-10"
        onClick={() => dispatch(setActived({}))}
      ></div>
      <div className="login-card">
        {!sendEmail ? (
          <>
            <div className="flex flex-col gap-4 w-full">
              <h4 className="mb-6">{t('logsign')}</h4>
              <div className="input-icon">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>{t('email')}</label>
                <MdOutlineEmail className="input-icon__icon" />
              </div>
              <button
                className="button-long mt-2"
                onClick={() => activeEmail()}
              >
                {load ? 'Loading...' : t('continune')}
              </button>
            </div>
            <div className="login-card__or">
              <hr />
              <label>{t('or')}</label>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div className="social-login facebook">
                <FaFacebook />
                <p>{t('facebook')}</p>
              </div>
              <div onClick={googleLogin} className="social-login google">
                <FcGoogle />
                <p>{t('google')}</p>
              </div>
              <span>
                <Link href="/about/policy">{t('term')}</Link> {t('and')}{' '}
                <Link href="/about/policy">{t('privacy')}</Link>
              </span>
            </div>
          </>
        ) : (
          <ActiveEmail activeEmail={sendEmail} />
        )}

        <div
          className="login-card__close"
          onClick={() => dispatch(setActived({}))}
        >
          <IoMdClose />
        </div>
      </div>
    </LoginSignupWrapper>
  );
}

const LoginSignupWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  background: rgba(0, 0, 0, 0.6);

  .login-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    gap: 1rem;
    width: 30rem;
    transition: ${variables.transition};
    overflow: hidden;
    background: ${variables.backgroundColor};
    border-radius: ${variables.borderRadius};
    box-shadow: ${variables.shadow4};
    position: fixed;
    z-index: 15;
    top: 25vh;

    &__close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 1rem;
      font-size: 1.5rem;
      color: ${variables.grey400};
      cursor: pointer;
      transition: ${variables.transition};

      &:hover {
        color: ${variables.primary600};
      }
    }

    &__or {
      position: relative;
      width: 100%;
      padding: 1rem 0;
      display: flex;
      justify-content: center;
      margin: 2rem 0;

      hr {
        flex-grow: 1;
        border-color: ${variables.grey400};
      }

      label {
        position: absolute;
        color: ${variables.grey500};
        font-weight: 300;
        top: 0;
        padding: 0.5rem 1rem;
        background: ${variables.backgroundColor};
        text-transform: uppercase;
      }
    }

    .input-icon {
      position: relative;
      display: flex;
      justify-content: flex-start;
      width: 100%;

      input {
        width: 100%;
        padding: 0.75rem 3rem;
        box-shadow: 0 0 0 1px ${variables.grey300};
        border-radius: ${variables.borderRadius};
        background: transparent;
        z-index: 2;

        &:focus,
        &:valid {
          box-shadow: 0 0 0 1px ${variables.grey500};

          + label {
            color: ${variables.primary600};
            transform: translate(-2rem, -1.65rem) scale(0.8);
            z-index: 3;
          }

          + .input-icon__icon {
            color: red;
          }
        }
      }

      label {
        position: absolute;
        text-transform: capitalize;
        font-weight: 300;
        margin: 0 3rem;
        padding: 0 0.25rem;
        background: ${variables.backgroundColor};
        transition: ${variables.transition};
        color: ${variables.grey400};
      }

      &__icon {
        position: absolute;
        color: ${variables.grey400};
        transition: ${variables.transition};
        font-size: 1.35rem;
        margin: 0 0.75rem;
      }
    }

    h5,
    h4 {
      text-transform: none;
    }

    span {
      font-size: 0.9rem;
      font-weight: 200;
      color: ${variables.grey500};
      width: 100%;
      text-align: center;
      padding: 0.5rem 0;
      a {
        padding: 0 0.2rem;
        color: ${variables.grey500};
        text-decoration: underline;
        transition: ${variables.transition};
        &:hover {
          color: ${variables.primary600};
        }
      }
    }

    .social-login {
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      border-radius: ${variables.borderRadius};
      transition: ${variables.transition};
      cursor: pointer;
      font-size: 1.25rem;
      width: 100%;

      p {
        font-size: 1rem;
      }

      &.facebook {
        color: ${variables.white};
        background: #1877f2;

        &:hover {
          background: #125cbd;
        }
      }

      &.google {
        border: 1px solid ${variables.grey200};
        background: ${variables.white};

        &:hover {
          box-shadow: ${variables.shadow1};
        }
      }
    }
  }
`;
