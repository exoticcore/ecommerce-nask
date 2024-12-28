import React from 'react';
import styled from 'styled-components';
import * as theme from 'container/Styles';

function FormCard({ children }: React.PropsWithChildren) {
  return <FormCardStyle>{children}</FormCardStyle>;
}

const FormCardStyle = styled.div.attrs({ className: 'blurInAnimate' })`
  position: relative;
  background: ${theme.backgroundColor};
  border-radius: ${theme.borderRadius};
  height: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 2.5rem;
  box-shadow: ${theme.shadow4};
  width: 28rem;

  @media screen and (max-width: ${theme.tabletHorizontal}) {
    width: 26rem;
  }

  @media screen and (max-width: ${theme.mobileLarge}) {
    height: 3;
    width: 23rem;
    padding: 5rem 2rem;
  }

  @media screen and (max-width: ${theme.mobile}) {
    width: 20rem;
    padding: 4.5rem 2rem;
  }

  @media screen and (max-width: ${theme.mobileSmall}) {
    margin: 0 0.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
  }

  input {
    font-weight: 400;
  }

  a {
    display: flex;
    justify-content: end;
    letter-spacing: ${theme.letterSpacing};
  }

  .topic {
    font-size: 1.35rem;
    text-align: center;
    margin-bottom: 2.5rem;
    font-weight: 400;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
`;

export default FormCard;
