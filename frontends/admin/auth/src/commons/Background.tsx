import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

function Background({ children }: PropsWithChildren) {
  return <BackgroundStyle>{children}</BackgroundStyle>;
}

const BackgroundStyle = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #037ade, #03e5b7);
`;

export default Background;
