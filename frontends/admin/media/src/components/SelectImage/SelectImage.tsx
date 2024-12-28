import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../utils/redux';
import { setActivatedSelect, getImage, selectImage } from 'store/Store';
import * as theme from 'container/Styles';
import { MEDIA_API } from 'container/Config';

interface IImageList {
  created_at: string;
  id: string;
  name: string;
  path: string;
  updated_at: string;
}

const AddImage = (): React.ReactNode => {
  const dispatch = useAppDispatch();
  const media = useAppSelector((state) => state.media);

  const [isSingle, setIsSingle] = React.useState<boolean>(true);
  const [select, setSelect] = React.useState<number | null>(null);
  const [gallery, setGallery] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!media.image_list.length) {
      dispatch(getImage());
    }

    if (media.select_image.is_single !== isSingle) {
      setIsSingle(media.select_image.is_single);
    }
  }, [media.select_image.is_single]);

  const setImageFunc = (index: number) => {
    if (isSingle) {
      setSingleImageFunc(index);
    } else {
      setGalleryImageFunc(index);
    }
  };

  const setSingleImageFunc = (index: number) => {
    if (select === index) {
      setSelect(null);
    } else {
      setSelect(index);
    }
  };

  const setGalleryImageFunc = (index: number) => {
    if (gallery.includes(index)) {
      setGallery(gallery.filter((i) => i !== index));
    } else {
      setGallery([...gallery, index]);
    }
  };

  const selectImageOnClick = () => {
    if (isSingle) {
      if (select !== null) {
        dispatch(selectImage(media.image_list[select].name));
      }
    } else {
      if (gallery.length) {
        dispatch(selectImage(gallery.map((i) => media.image_list[i].name)));
      }
    }
  };

  const previewSelectClass = (img_index: number) => {
    if (isSingle) {
      return select === img_index ? '--selected' : '';
    } else {
      return gallery.includes(img_index) ? '--selected' : '';
    }
  };

  const selectButtonClass = () => {
    if ((isSingle && select === null) || (!isSingle && !gallery.length)) {
      return ' --disabled';
    } else {
      return '';
    }
  };

  return (
    <AddImageStyle>
      <div className="card hiden-scroll">
        <div className="flex justify-between content-between w-full">
          <h4 className="pt-3">Select Image</h4>
          <button onClick={() => dispatch(setActivatedSelect(false))}>
            Close
          </button>
        </div>
        <div className="image-grid hide-scroll">
          {media.image_list.map((image: IImageList, i: number) => {
            return (
              <div
                className={`image-grid__preview ${previewSelectClass(i)}`}
                key={i}
              >
                <img
                  src={`${MEDIA_API}/image/${image.name}`}
                  crossOrigin="anonymous"
                  onClick={() => setImageFunc(i)}
                />
              </div>
            );
          })}
        </div>
        <div className="flex w-full justify-end">
          <button
            className={`button ${selectButtonClass()}`}
            onClick={() => selectImageOnClick()}
          >
            Select
          </button>
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
  grid-gap: 1rem;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  .card {
    position: relative;
    background: ${theme.white};
    padding: 1rem;
    min-height: 20rem;
    width: 40rem;
    border-radius: ${theme.borderRadius};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .image-grid {
      width: 100%;
      height: 100%;
      position: relative;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-auto-rows: 1fr;
      grid-gap: 0.5rem;
      padding: 0.5rem;
      transition: ${theme.transition};

      .image-grid__preview {
        width: 100%;
        height: 100%;
        box-shadow: 0 0 0 1px ${theme.grey200};
        border-radius: ${theme.borderRadius};
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        &:hover {
          box-shadow: 0 0 0 2px ${theme.grey200};
        }

        &.--selected {
          box-shadow: 0 0 0 2px ${theme.primary500};
        }
      }
    }
  }
`;

export default AddImage;
