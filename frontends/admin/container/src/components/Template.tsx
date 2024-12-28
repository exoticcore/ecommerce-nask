import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import * as Theme from '../constant/styles';
import MediaApp from './MediaApp';
import { useAppSelector } from '../utils/redux';

function Template({ children }: React.PropsWithChildren) {
  const image_select_state = useAppSelector(
    (state) => state.media.select_image.activated
  );

  const [imageState, setImageState] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (image_select_state !== null) {
      setImageState(image_select_state);
    }
  }, [image_select_state]);

  return (
    <TemplateStyle>
      <Sidebar />
      {imageState && <MediaApp main={'select-image'} />}
      <div className="template__main">
        <Header />
        <div className="my-main">{children}</div>
      </div>
    </TemplateStyle>
  );
}

const TemplateStyle = styled.div`
  display: flex;
  gap: 0;
  background: white;
  height: 100svh;
  overflow-x: hidden;
  overflow-y: hidden;

  .template {
    &__main {
      display: flex;
      flex-direction: column;
      padding: 0;
      width: 100%;
      overflow-x: hidden;
      overflow-y: hidden;

      position: relative;

      .my-main {
        width: 100%;
        height: 100%;
        flex-shrink: 1;
        padding: 0;
        position: relative;
        overflow-y: scroll;
        border-radius: 0.5rem 0 0 0;
        background: ${Theme.backgroundColor};
      }
    }
  }
`;

export default Template;
