import React, { useRef, useEffect } from 'react';
import * as theme from 'container/Styles';
import styled from 'styled-components';
import { useAppSelector } from '../../utils/redux';

interface FilesDragAndDropProps {
  onUpload: (files: FileList) => void; // Expecting a function that takes FileList as an argument
  children: React.ReactNode;
}

export default function FilesDragAndDrop({
  onUpload,
  children,
}: FilesDragAndDropProps): React.ReactElement {
  const drop = useRef<HTMLDivElement | null>(null);

  const file: string | undefined | null = useAppSelector(
    (state) => state.media.add_media.file
  );

  const [dragging, setDragging] = React.useState(false);

  const [dropped, setDropped] = React.useState(false);

  const drag = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dropNode = drop.current;

    if (dropNode) {
      dropNode.addEventListener('dragover', handleDragOver);
      dropNode.addEventListener('drop', handleDrop);
      dropNode.addEventListener('dragenter', handleDragEnter);
      dropNode.addEventListener('dragleave', handleDragLeave);
    }

    return () => {
      if (dropNode) {
        dropNode.removeEventListener('dragover', handleDragOver);
        dropNode.removeEventListener('drop', handleDrop);
        dropNode.removeEventListener('dragenter', handleDragEnter);
        dropNode.removeEventListener('dragleave', handleDragLeave);
      }
    };
  }, []);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(true);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    const { files } = e.dataTransfer || {};
    if (files && files.length > 0) {
      onUpload(files); // Make sure onUpload is called here
      setDropped(true);
    }
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target !== drag.current) {
      setDragging(true);
    }

    // setDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // if (e.target !== drag.current) {
    //   setDragging(false);
    // }

    setDragging(false);
  };

  return (
    <FileDragAndDropStyle ref={drop}>
      {dragging && !dropped && (
        <div ref={drag} className="FilesDragAndDrop__placeholder">
          Drop that file down low
          <span role="img" aria-label="emoji" className="area__icon">
            &#128526;
          </span>
        </div>
      )}
      {!dragging && file && (
        <div className="FilesDragAndDrop__preview">
          <img src={file} alt="" />
        </div>
      )}
      {children}
    </FileDragAndDropStyle>
  );
}

const FileDragAndDropStyle = styled.div.attrs({
  className: 'FilesDragAndDrop',
})`
  position: relative;
  width: 30rem;
  height: 30rem;

  .FilesDragAndDrop__placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    background-color: #e7e7e7;
    border-radius: 12px;
    color: #7f8e99;
    font-size: 24px;
    opacity: 0.9;
    text-align: center;
    line-height: 1.4;

    .area__icon {
      font-size: 64px;
      margin-top: 20px;
    }
  }

  .FilesDragAndDrop__area {
    width: 100%;
    height: 100%;
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    font-size: 24px;
    color: #555555;
    border: 2px #c3c3c3 dashed;
    border-radius: 12px;

    .area__icon {
      font-size: 64px;
      margin-top: 20px;
    }
  }

  .FilesDragAndDrop__preview {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    background-color: ${theme.white};
    border-radius: 12px;
    color: #7f8e99;
    font-size: 24px;
    text-align: center;
    line-height: 1.4;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
