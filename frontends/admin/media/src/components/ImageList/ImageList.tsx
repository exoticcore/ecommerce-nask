import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../utils/redux';
import { getImage, deleteImage, activatedUpload } from 'store/Store';
// @ts-ignore
import { MEDIA_API } from 'container/Config';
import AddImage from '../AddImage/AddImage';

interface IImageState {
  created_at: string;
  id: string;
  name: string;
  path: string;
  updated_at: string;
}

const ImageList = (): React.ReactNode => {
  const dispatch = useAppDispatch();
  const media = useAppSelector((state) => state.media);

  useEffect(() => {
    if (!media.image_list.length) {
      dispatch(getImage());
    }
    if (media) {
      if (media.add_media) {
        // console.log(media.add_media.activated);
      }
    }
  }, [media.add_media]);

  const deleteImageEvent = ($image_name: string) => {
    dispatch(deleteImage($image_name));
  };

  return (
    <ImageListStyle>
      <div className="flex py-5 justify-end items-center w-full">
        <button
          className="button"
          onClick={() => dispatch(activatedUpload(true))}
        >
          Upload Image
        </button>
      </div>
      {media.image_list.length > 0 ? (
        <div className="py-3">
          <table>
            <thead>
              <tr>
                <td>Image</td>
                <td>Name</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {media.image_list.map((image: IImageState, i: number) => {
                return (
                  <tr key={i}>
                    <td>
                      <img
                        src={`${MEDIA_API}/image/${image.name}`}
                        width={100}
                        height={100}
                        crossOrigin="anonymous"
                      />
                    </td>
                    <td>
                      <p>{image.name}</p>
                    </td>
                    <td>
                      <button onClick={() => deleteImageEvent(image.name)}>
                        remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ''
      )}
      {media.add_media.activated ? <AddImage /> : ''}
    </ImageListStyle>
  );
};

const ImageListStyle = styled.div`
  padding: 1rem;
  overflow-y: scroll;

  table {
    overflow-x: scroll;
  }
`;

export default ImageList;
