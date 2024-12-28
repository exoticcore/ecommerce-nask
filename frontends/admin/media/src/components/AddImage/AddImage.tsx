import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../utils/redux';
import { setFile, uploadImage, setActivatedSelect } from 'store/Store';
import * as theme from 'container/Styles';
import FilesDragAndDrop from '../share/FileDragAndDrop';
import formatBytes from '../../utils/format-byte';
import CheckImageName from '../share/CheckImageName';

interface IFileDetail {
  file_name?: string;
  file_size?: string;
  file_type?: string;
  file_preview?: string;
  file: File;
}

const AddImage = (): React.ReactNode => {
  const [fileDetail, setFileDetail] = useState<IFileDetail | null>(null);
  const dispatch = useAppDispatch();
  const add_media = useAppSelector((state) => state.media.add_media);

  // Handle file upload and set file details
  const onUpload = (files: FileList) => {
    setFileDetail({
      file_name: files[0].name,
      file_size: formatBytes(files[0].size),
      file_type: files[0].type,
      file_preview: URL.createObjectURL(files[0]),
      file: files[0],
    });

    dispatch(
      setFile({
        file_preview: URL.createObjectURL(files[0]),
        file_type: files[0].type,
      })
    );
  };

  const upload = () => {
    console.log(fileDetail?.file);
    if (fileDetail) {
      dispatch(
        uploadImage({ image_name: add_media.new_name, file: fileDetail.file })
      );
    }
  };

  return (
    <AddImageStyle>
      <div className="card">
        <div className="flex justify-between content-between w-full">
          <h4 className="pt-3">Upload Image</h4>
          <button onClick={() => dispatch(setActivatedSelect(false))}>
            Close
          </button>
        </div>
        <FilesDragAndDrop onUpload={onUpload}>
          <div className="FilesDragAndDrop__area">
            Hey, drop me some images
            <span role="img" aria-label="emoji" className="area__icon">
              &#128526;
            </span>
          </div>
        </FilesDragAndDrop>
        <div className="flex w-full">
          <div className="px-14 font-light text-sm">
            <p>{fileDetail?.file_name}</p>
            <p>{fileDetail?.file_size}</p>
            <p>{fileDetail?.file_type}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full px-14">
          <CheckImageName />
          <div className="form-input text-area">
            <textarea required></textarea>
            <label>Description</label>
          </div>
        </div>
        <div className="flex w-full justify-end px-14">
          <div className="button" onClick={upload}>
            Upload
          </div>
        </div>
      </div>
    </AddImageStyle>
  );
};

const AddImageStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    position: relative;
    background: ${theme.white};
    padding: 1rem;
    min-height: 30rem;
    min-width: 40rem;
    border-radius: ${theme.borderRadius};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .image-preview {
    display: block;
  }
`;

export default AddImage;
